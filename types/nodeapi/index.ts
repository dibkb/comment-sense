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

interface SearchVideo {
  channel: {
    id: string;
    name: string;
    url: string;
  };
  duration: {
    pretty: string;
    text: string;
  };
  id: string;
  published: {
    pretty: string;
  };
  thumbnails: {
    height: number;
    url: string;
    width: number;
  }[];
  title: string;
  url: string;
  views: {
    pretty: string;
    prettyLong: string;
    text: string;
  };
}
interface SearchPlaylist {
  id: string;
  name: string;
  published: {
    pretty?: string;
  };
  thumbnails: {
    height: number;
    url: string;
    width: number;
  }[];
  url: string;
  videoCount: string;
}
interface SearchChannel {
  badges: string[];
  icons: {
    height: number;
    url: string;
    width: number;
  }[];
  id: string;
  name: string;
  subscribers: {
    pretty: string;
    text: string;
  };
  url: string;
}
export interface SearchResults {
  channels: SearchChannel[];
  playlists: SearchPlaylist[];
  videos: SearchVideo[];
}
