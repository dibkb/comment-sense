export type YouTubeVideoResponse = {
  kind: string;
  etag: string;
  items: Array<{
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: ThumbnailInfo;
        medium: ThumbnailInfo;
        high: ThumbnailInfo;
        standard: ThumbnailInfo;
        maxres: ThumbnailInfo;
      };
      channelTitle: string;
      categoryId: string;
      liveBroadcastContent: string;
      localized: {
        title: string;
        description: string;
      };
      defaultAudioLanguage: string;
    };
    contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: boolean;
      contentRating: Record<string, unknown>;
      projection: string;
    };
    status: {
      uploadStatus: string;
      privacyStatus: string;
      license: string;
      embeddable: boolean;
      publicStatsViewable: boolean;
      madeForKids: boolean;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
  }>;
};

type ThumbnailInfo = {
  url: string;
  width: number;
  height: number;
};

export type YouTubeChannelResponse = {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Array<{
    kind: string;
    etag: string;
    id: string;
    snippet: {
      title: string;
      description: string;
      customUrl: string;
      publishedAt: string;
      thumbnails: {
        default: ThumbnailInfo;
        medium: ThumbnailInfo;
        high: ThumbnailInfo;
      };
      localized: {
        title: string;
        description: string;
      };
    };
    contentDetails: {
      relatedPlaylists: {
        likes: string;
        uploads: string;
      };
    };
    statistics: {
      viewCount: string;
      subscriberCount: string;
      hiddenSubscriberCount: boolean;
      videoCount: string;
    };
    status: {
      privacyStatus: string;
      isLinked: boolean;
      longUploadsStatus: string;
    };
  }>;
};

export type YouTubeSearchListResponse = {
  kind: "youtube#searchListResponse";
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchResult[];
};

type YouTubeSearchResult = {
  kind: "youtube#searchResult";
  etag: string;
  id: {
    kind: "youtube#video";
    videoId: string;
  };
  snippet: YouTubeSnippet;
};

type YouTubeSnippet = {
  publishedAt?: string;
  channelId?: string;
  title?: string;
  description?: string;
  thumbnails?: YouTubeThumbnails;
  channelTitle?: string;
  liveBroadcastContent?: string;
  publishTime?: string;
};
type YouTubeThumbnails = {
  default: ThumbnailInfo;
  medium: ThumbnailInfo;
  high: ThumbnailInfo;
};
