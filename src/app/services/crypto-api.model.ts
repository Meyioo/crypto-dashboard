export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string; // ISO date-time string
  atl: number;
  atl_change_percentage: number;
  atl_date: string; // ISO date-time string
  roi: string | null;
  last_updated: string; // ISO date-time string
  price_change_percentage_1h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export interface CoinDataQueryParams {
  order: string;
}

export interface CoinMetadata {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string | null;
  platforms: Record<string, string>;
  detail_platforms: Record<string, any>;
  block_time_in_minutes: number;
  hashing_algorithm: string | null;
  categories: string[];
  preview_listing: boolean;
  public_notice: string | null;
  additional_notices: string[];
  localization: Record<string, string>;
  description: Record<string, string>;
  links: {
    homepage: string[];
    whitepaper: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    snapshot_url: string;
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: string | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: Record<string, string[]>;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string | null;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  market_data: MarketData;
  community_data: CommunityData;
  developer_data: DeveloperData;
  status_updates: StatusUpdate[];
  last_updated: string;
  tickers: Ticker[];
}

export interface MarketData {
  current_price: Record<string, number>;
  total_value_locked: number | null;
  mcap_to_tvl_ratio: number | null;
  fdv_to_tvl_ratio: number | null;
  roi: number | null;
  ath: Record<string, number>;
  ath_change_percentage: Record<string, number>;
  ath_date: Record<string, string>;
  atl: Record<string, number>;
  atl_change_percentage: Record<string, number>;
  atl_date: Record<string, string>;
  market_cap: Record<string, number>;
  market_cap_rank: number;
  fully_diluted_valuation: Record<string, number>;
  market_cap_fdv_ratio: number;
  total_volume: Record<string, number>;
  high_24h: Record<string, number>;
  low_24h: Record<string, number>;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_percentage_1h_in_currency: Record<string, number>;
  price_change_percentage_24h_in_currency: Record<string, number>;
  price_change_percentage_7d_in_currency: Record<string, number>;
  price_change_percentage_14d_in_currency: Record<string, number>;
  price_change_percentage_30d_in_currency: Record<string, number>;
  price_change_percentage_60d_in_currency: Record<string, number>;
  price_change_percentage_200d_in_currency: Record<string, number>;
  price_change_percentage_1y_in_currency: Record<string, number>;
  market_cap_change_24h_in_currency: Record<string, number>;
  market_cap_change_percentage_24h_in_currency: Record<string, number>;
  total_supply: number | null;
  max_supply: number | null;
  circulating_supply: number;
  last_updated: string;
}

export interface CommunityData {
  facebook_likes: number | null;
  twitter_followers: number;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count: number | null;
}

export interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: {
    additions: number;
    deletions: number;
  };
  commit_count_4_weeks: number;
  last_4_weeks_commit_activity_series: number[];
}

export interface StatusUpdate {
  [key: string]: any;
  last_updated: string;
}

export interface Ticker {
  base: string;
  target: string;
  market: {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
  };
  last: number;
  volume: number;
  converted_last: Record<string, number>;
  converted_volume: Record<string, number>;
  trust_score: string;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string;
  token_info_url: string | null;
  coin_id: string;
  target_coin_id: string | null;
}
