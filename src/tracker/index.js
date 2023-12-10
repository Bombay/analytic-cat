import { v4 } from 'uuid'
;(window => {
  const {
    screen: { width, height },
    navigator: { language },
    location,
    localStorage,
    document,
    history,
  } = window
  const { hostname, pathname, search } = location
  const { currentScript } = document

  if (!currentScript) return

  const _data = 'data-'
  const _false = 'false'
  const attr = currentScript.getAttribute.bind(currentScript)
  const service = attr(_data + 'service-id')
  const hostUrl = attr(_data + 'host-url')
  const autoTrack = attr(_data + 'auto-track') !== _false
  const dnt = attr(_data + 'do-not-track')
  const domain = attr(_data + 'domains') || ''
  const domains = domain.split(',').map(n => n.trim())
  const root = hostUrl
    ? hostUrl.replace(/\/$/, '')
    : currentScript.src.split('/').slice(0, -1).join('/')
  const endpoint = `${root}/api/send`
  const screen = `${width}x${height}`
  const eventRegex = /data-ancat-event-([\w-_]+)/
  const eventNameAttribute = _data + 'ancat-event'
  const delayDuration = 300

  /* User */
  let userId
  let userName
  let userTeam
  let userCorp
  const identify = ({ id, name, team, corp }) => {
    userId = id
    userName = name
    userTeam = team
    userCorp = corp
  }

  /* Helper functions */

  const hook = (_this, method, callback) => {
    const orig = _this[method]

    return (...args) => {
      callback.apply(null, args)

      return orig.apply(_this, args)
    }
  }

  const getPath = url => {
    if (url.substring(0, 4) === 'http') {
      return '/' + url.split('/').splice(3).join('/')
    }
    return url
  }

  const getPayload = () => ({
    sessionId: getSessionId(),
    service,
    hostname,
    screen,
    language,
    title,
    url: currentUrl,
    referrer: currentRef,
    userId,
    userName,
    userTeam,
    userCorp,
  })

  /* Tracking functions */

  const doNotTrack = () => {
    const { doNotTrack, navigator, external } = window

    const msTrackProtection = 'msTrackingProtectionEnabled'
    const msTracking = () => {
      return external && msTrackProtection in external && external[msTrackProtection]()
    }

    const dnt = doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || msTracking()

    return dnt == '1' || dnt === 'yes'
  }

  const trackingDisabled = () =>
    (localStorage && localStorage.getItem('ancat.disabled')) ||
    (dnt && doNotTrack()) ||
    (domain && !domains.includes(hostname))

  const handlePush = (state, title, url) => {
    if (!url) return

    currentRef = currentUrl
    currentUrl = getPath(url.toString())

    if (currentUrl !== currentRef) {
      setTimeout(track, delayDuration)
    }
  }

  const handleClick = () => {
    const trackElement = el => {
      const attr = el.getAttribute.bind(el)
      const eventName = attr(eventNameAttribute)

      if (eventName) {
        const eventData = {}

        el.getAttributeNames().forEach(name => {
          const match = name.match(eventRegex)

          if (match) {
            eventData[match[1]] = attr(name)
          }
        })

        return track(eventName, eventData)
      }
      return Promise.resolve()
    }

    const callback = e => {
      const findATagParent = (rootElem, maxSearchDepth) => {
        let currentElement = rootElem
        for (let i = 0; i < maxSearchDepth; i++) {
          if (currentElement.tagName === 'A') {
            return currentElement
          }
          currentElement = currentElement.parentElement
          if (!currentElement) {
            return null
          }
        }
        return null
      }

      const el = e.target
      const anchor = el.tagName === 'A' ? el : findATagParent(el, 10)

      if (anchor) {
        const { href, target } = anchor
        const external =
          target === '_blank' ||
          e.ctrlKey ||
          e.shiftKey ||
          e.metaKey ||
          (e.button && e.button === 1)
        const eventName = anchor.getAttribute(eventNameAttribute)

        if (eventName && href) {
          if (!external) {
            e.preventDefault()
          }
          return trackElement(anchor).then(() => {
            if (!external) location.href = href
          })
        }
      } else {
        trackElement(el)
      }
    }

    document.addEventListener('click', callback, true)
  }

  const observeTitle = () => {
    const callback = ([entry]) => {
      title = entry && entry.target ? entry.target.text : undefined
    }

    const observer = new MutationObserver(callback)

    const node = document.querySelector('head > title')

    if (node) {
      observer.observe(node, {
        subtree: true,
        characterData: true,
        childList: true,
      })
    }
  }

  const getSessionId = () => {
    const currentTimestamp = new Date().getTime()
    const sessionIdKey = 'ancat-session-id'
    const sessionExpiryKey = 'ancat-session-expiry'
    const existingSessionId = localStorage.getItem(sessionIdKey)
    const existingSessionExpiry = localStorage.getItem(sessionExpiryKey)

    // Check if a session id already exists and hasn't expired
    if (
      existingSessionId &&
      existingSessionExpiry &&
      currentTimestamp < Number(existingSessionExpiry)
    ) {
      // Update the session expiry time to 30 minutes from now
      const newExpiryTime = currentTimestamp + 30 * 60 * 1000 // 30 minutes in milliseconds
      localStorage.setItem(sessionExpiryKey, newExpiryTime.toString())
      return existingSessionId
    }

    // If no session id or it has expired, create a new one
    const newSessionId = v4()
    const newExpiryTime = currentTimestamp + 30 * 60 * 1000 // 30 minutes in milliseconds
    localStorage.setItem(sessionIdKey, newSessionId)
    localStorage.setItem(sessionExpiryKey, newExpiryTime.toString())

    return newSessionId
  }

  const send = (payload, type = 'event') => {
    if (trackingDisabled()) return
    const headers = {
      'Content-Type': 'application/json',
    }
    if (typeof cache !== 'undefined') {
      headers['x-ancat-cache'] = cache
    }
    return fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ type, payload }),
      headers,
    })
      .then(res => res.text())
      .then(text => (cache = text))
      .catch(() => {}) // no-op, gulp error
  }

  const track = (obj, data) => {
    if (typeof obj === 'string') {
      return send({
        ...getPayload(),
        name: obj,
        data: typeof data === 'object' ? data : undefined,
      })
    } else if (typeof obj === 'object') {
      return send(obj)
    } else if (typeof obj === 'function') {
      return send(obj(getPayload()))
    }
    return send(getPayload())
  }

  /* Start */

  if (!window.ancat) {
    window.ancat = {
      track,
      identify,
    }
  }

  let currentUrl = `${pathname}${search}`
  let currentRef = document.referrer
  let title = document.title
  let cache
  let initialized

  if (autoTrack && !trackingDisabled()) {
    history.pushState = hook(history, 'pushState', handlePush)
    history.replaceState = hook(history, 'replaceState', handlePush)
    handleClick()
    observeTitle()

    const init = () => {
      if (document.readyState === 'complete' && !initialized) {
        track()
        initialized = true
      }
    }

    document.addEventListener('readystatechange', init, true)

    init()
  }
})(window)
