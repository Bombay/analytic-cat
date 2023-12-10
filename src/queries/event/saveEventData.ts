import { DynamicData } from '@/types/types'
import { flattenJSON } from '@/lib/data'
import { DATA_TYPE } from '@/lib/constants'
import { rawQuery } from '@/lib/clickhouse'

interface SaveEventDataProps {
  serviceId: string
  eventId: string
  sessionId: string
  urlPath?: string
  eventName?: string
  eventData: DynamicData
  createdAt: string
}

export async function saveEventData({
  eventId,
  serviceId,
  sessionId,
  urlPath,
  eventName,
  eventData,
  createdAt,
}: SaveEventDataProps) {
  const data = flattenJSON(eventData)
  const params = data.map(datum => ({
    eventId,
    serviceId,
    sessionId,
    urlPath,
    eventName,
    eventKey: datum.key,
    stringValue: datum.value.toString(),
    numberValue: datum.dynamicDataType === DATA_TYPE.number ? datum.value : null,
    dateValue:
      datum.dynamicDataType === DATA_TYPE.date
        ? new Date(datum.value).toISOString().slice(0, 19).replace('T', ' ')
        : null,
    dataType: datum.dynamicDataType,
    created_at: createdAt,
  }))

  const query = `
      INSERT INTO ancat.event_data (event_id,
                                    service_id,
                                    session_id,
                                    url_path,  
                                    event_name,
                                    event_key, 
                                    string_value,
                                    number_value,
                                    date_value,
                                    data_type, 
                                    created_at
                                  ) VALUES (
                                  {eventId : UUID},
                                  {serviceId : UUID},
                                  {sessionId : UUID},
                                  {urlPath : String},
                                  {eventName : String},
                                  {eventKey : String},
                                  {stringValue : String},
                                  {numberValue : String},
                                  {dateValue : DateTime('UTC')},
                                  {dataType : UInt32},
                                  {createdAt : DateTime('UTC')}
                                );`

  await Promise.all(params.map(param => rawQuery(query, param)))
  return params
}
