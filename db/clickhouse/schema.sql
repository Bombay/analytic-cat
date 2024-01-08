CREATE DATABASE ancat;

-- Create Event
CREATE TABLE ancat.event
(
    event_id        UUID,
    service_id      UUID,
    session_id      UUID,
    --user
    user_id LowCardinality(String),
    user_name LowCardinality(String),
    user_team LowCardinality(String),
    user_corp LowCardinality(String),
    --sessions
    hostname LowCardinality(String),
    browser LowCardinality(String),
    browser_version LowCardinality(String),
    os LowCardinality(String),
    os_version LowCardinality(String),
    device LowCardinality(String),
    device_vendor LowCardinality(String),
    screen LowCardinality(String),
    language LowCardinality(String),
    country LowCardinality(String),
    subdivision1 LowCardinality(String),
    subdivision2 LowCardinality(String),
    city            String,
    --pageviews
    url_path        String,
    url_query       String,
    referrer_path   String,
    referrer_query  String,
    referrer_domain String,
    page_title      String,
    --events
    event_type      UInt32,
    event_name      String,
    created_at      DateTime('UTC')
)
    engine = MergeTree
        ORDER BY (service_id, session_id, created_at)
        SETTINGS index_granularity = 8192;

CREATE TABLE ancat.event_data
(
    event_id   UUID,
    service_id UUID,
    session_id UUID,
    url_path   String,
    event_name String,
    event_key  String,
    string_value Nullable(String),
    number_value Nullable(Decimal64(4)), --922337203685477.5625
    date_value Nullable(DateTime('UTC')),
    data_type  UInt32,
    created_at DateTime('UTC')
)
    engine = MergeTree
        ORDER BY (service_id, event_id, event_key, created_at)
        SETTINGS index_granularity = 8192;
