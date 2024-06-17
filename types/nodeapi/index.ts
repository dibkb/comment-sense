export interface VideoInfo {
  category: string;
  channel: {
    icons: {
      height: number;
      url: string;
      width: number;
    }[];
    id: string;
    name: string;
    subscribers: {
      pretty: string;
    };
    url: string;
  };
  description: string;
  duration: {
    lengthSec: string;
  };
  embed: {
    flashSecureUrl: string;
    flashUrl: string;
    height: number;
    iframeUrl: string;
    width: number;
  };
  id: string;
  isFamilySafe: boolean;
  isLive: boolean;
  isUnlisted: boolean;
  keywords: string[];
  published: {
    pretty: string;
    text: string;
  };
  ratings: {
    dislikes: {
      pretty: string;
      text: string;
    };
    likes: {
      pretty: string;
      text: string;
    };
  };
  shortDescription: string;
  thumbnails: {
    height: number;
    url: string;
    width: number;
  }[];
  title: string;
  uploaded: {
    text: string;
  };
  url: string;
  views: {
    pretty: string;
    text: string;
  };
}
