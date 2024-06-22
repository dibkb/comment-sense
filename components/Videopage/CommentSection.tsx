import { CommentProvider, useCommentContext } from "@/context/CommentContext";
import useFetchComments from "@/hooks/useFetchComments";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { type Comment } from "@/types/fastapi";
import { TabsContent, TabsTrigger, Tabs, TabsList } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { heading } from "@/fonts";
import SentimentTab from "./Tabs/SentimentTab";
const mockData: Comment[] = [
  {
    cid: "UgzFXbeOKkgVmIZIuqF4AaABAg",
    text: "You are a GOAT for doing this. Suggestion for the next video: Make a cricket ball trejectory analysis system.",
    time: "2 months ago",
    author: "@fazilkagdi3290",
    channel: "UCLeWmS3xmnu6d-yH4i2FtyA",
    votes: "5",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_ldjJOf__6546g14cCuBdFoxizjA70jroCp1gNvgQqXnsI=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769592.506127,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.925053596496582,
    },
    emotion: {
      label: "admiration",
      score: 0.5773534774780273,
    },
  },
  {
    cid: "UgyuaRk2PiF1qzsfH2Z4AaABAg",
    text: "My favorite video on YouTube. Thanks for the great tutorial, this will be a game changer for me",
    time: "1 month ago",
    author: "@feszty",
    channel: "UCLzQWYO1Ku-Yn5449l_RbGg",
    votes: "1",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_mPRjoejH-sOR9f5_-gV2lTpKvYcsQSZnONfG9tXGk=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1716361592.506777,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9910591244697571,
    },
    emotion: {
      label: "gratitude",
      score: 0.9501509070396423,
    },
  },
  {
    cid: "Ugw-l4X6Uge1_1FASAt4AaABAg",
    text: "Tutorial looks insane and interesting even tough i'm not interested in machine learning i'm going to dive into this. Please keep up the good work with these tutorials!",
    time: "1 month ago",
    author: "@theeko5317",
    channel: "UCPvassA2z4F125TJTnYSb2w",
    votes: "4",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_l7BzWLlVadUFGzLbyUNfYkyk_bDQ7kz_pN8jdrwwY=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.507305,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9681983590126038,
    },
    emotion: {
      label: "admiration",
      score: 0.8736993074417114,
    },
  },
  {
    cid: "UgwR68yeJrsM3Bpz59l4AaABAg",
    text: "I so love this... I am a beginner in this field and I so love it. Thank you for Inspiring me.",
    time: "1 month ago",
    author: "@medionstudios",
    channel: "UCzIwp-_DyjDkpDri2dsJMIw",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/UuVLOO-68xyPxD9i3Gtid17TAPG272TjkpjCoUEgLwiigfYx2XGXW-ilrsRZB58ojln9xuhMNw=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1716361592.507839,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.989111602306366,
    },
    emotion: {
      label: "gratitude",
      score: 0.9600729942321777,
    },
  },
  {
    cid: "UgwkmFw4F0EttGz6Jwt4AaABAg",
    text: "Wow! We need more CV project from you, because they are so cool and usefull for learning DL",
    time: "1 month ago",
    author: "@user-oq7ju6vp7j",
    channel: "UCTLgHg79ub9SnGH32_zwaog",
    votes: "1",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_nxkXCzXfeJEefU7W9qPIl4Kz3qGPZ16whH2KvdrPc=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.508375,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.984601616859436,
    },
    emotion: {
      label: "admiration",
      score: 0.7755829095840454,
    },
  },
  {
    cid: "UgyPpux7XsMTcoTjUbx4AaABAg",
    text: "what a great video of a full complete and intelligent project. Great job!",
    time: "1 month ago",
    author: "@bessa0",
    channel: "UC55jgmak0c2fKxcljO6XkwA",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/bnyhQDoqc1nJV_cmWlhJin7F8yWk1LuxhbR6ziADsL5cTbynt0D4xRC-Cioxkdox7r1dM2NIpg=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.508897,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9848723411560059,
    },
    emotion: {
      label: "admiration",
      score: 0.9553127288818359,
    },
  },
  {
    cid: "Ugy4s8cSSa_rwWszG3J4AaABAg",
    text: "I love to see this kind of tutorial. I appreciate your content",
    time: "1 month ago",
    author: "@prefectdays",
    channel: "UCcXVGg68QKt1wB8ACJIgepg",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_kOIcTa3ML__iCX2nBIn38bzJPiGmc-keigP-VSPVrrBDZs-MNU1B5OlxBkfnxQzKJY3g=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1716361592.50942,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9819168448448181,
    },
    emotion: {
      label: "admiration",
      score: 0.8014169931411743,
    },
  },
  {
    cid: "UgzCuy7UGucDuY8lv9V4AaABAg",
    text: "Pure gem video and channel. That's whats I needed!",
    time: "1 month ago",
    author: "@ukasz9430",
    channel: "UCBLDQcJzOAsBUyT8pmCOAWQ",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_nS5y3btzA_UWAg_4gJwWCZluBXlaQZP5MQ83cD69w=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.510466,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9796055555343628,
    },
    emotion: {
      label: "admiration",
      score: 0.6431705951690674,
    },
  },
  {
    cid: "Ugyin8kzLTrSpgnuYNd4AaABAg",
    text: "Thank you for this type of videos It really helps the community",
    time: "2 months ago",
    author: "@franquilesruiz9073",
    channel: "UCwH9YmN3oPnisaCN8a85q9g",
    votes: "2",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_n-H_5rU7QjbCMQhZ33biFja8apSlL6mHQ8ILFwev2f5_U=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769592.510992,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9736930131912231,
    },
    emotion: {
      label: "gratitude",
      score: 0.988821268081665,
    },
  },
  {
    cid: "UgyAATFvx_kCsGe0FEN4AaABAg",
    text: "This channel needs more attention. Good job!",
    time: "2 months ago",
    author: "@Grepsoft",
    channel: "UCcUtYJSaGKO9nXnDPwwJ89g",
    votes: "4",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_mRG0Zm_nVdAeL5feaws6wnzejXY2M95BZoPhpeBMH7w9g=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769592.511515,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9674122929573059,
    },
    emotion: {
      label: "admiration",
      score: 0.9394645094871521,
    },
  },
  {
    cid: "Ugz8bed9HuRfNXgR1HJ4AaABAg",
    text: "Man you are a gem. Keep up the good work.",
    time: "1 month ago",
    author: "@fariduzzamansid",
    channel: "UCOmT8tkq_YYkV57i9t5xRHQ",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_kexSU46w6cYLAw7n2skj-kjy6uv4tRLz7Q3K1rsh5kWb6z0DWyfRdUElppkPxsBgt36Q=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1716361592.512026,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9773897528648376,
    },
    emotion: {
      label: "admiration",
      score: 0.9502161741256714,
    },
  },
  {
    cid: "UgwfzOSUT3hM66lh26V4AaABAg",
    text: "Incredible job mate, we gotta make the resume shine",
    time: "2 months ago",
    author: "@fouadhellal5346",
    channel: "UC5r48KbCyPqtPA8XqyM5QmA",
    votes: "14",
    replies: "",
    photo:
      "https://yt3.ggpht.com/7uf3wF3EvVmfSdqi9aacUV80feRkDmv68Zd7s-sAUhlYjmXa_rWw1sWNNRBQiEGaiZzeCHd0NA=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769592.512547,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9767554402351379,
    },
    emotion: {
      label: "admiration",
      score: 0.9416718482971191,
    },
  },
  {
    cid: "UgwhnAoHP6_l65ZyTUV4AaABAg",
    text: "Your videos are very detailed and step-by-step instructions. I really like them and thank you very much for your enthusiasm",
    time: "6 days ago",
    author: "@cuongleinh975",
    channel: "UC86ougUkCS1wz-NhhpDGE2g",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_nLNhRYz1GlTtrgWbvYkCPamdE_qwxL56TBwR9ADHQ=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1718521592.512966,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9839957356452942,
    },
    emotion: {
      label: "gratitude",
      score: 0.9728310108184814,
    },
  },
  {
    cid: "UgxXndnxbIXHTak_h0l4AaABAg",
    text: "Thank you so much for sharing your experience and knowledge, Sir.",
    time: "2 months ago",
    author: "@uminhtetoo",
    channel: "UC92daJo3FEJBNQuIKyoq_pw",
    votes: "1",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_my32aSvKmj1AsJlzrNofj3t1oES-dPe13oXqHgUjJuNlo=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769592.513496,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9731777310371399,
    },
    emotion: {
      label: "gratitude",
      score: 0.9916788935661316,
    },
  },
  {
    cid: "Ugy-Q3qWMmmxbI9FcVt4AaABAg",
    text: "What a project!!! Amazed,  thanks a lot",
    time: "4 days ago",
    author: "@if...2440",
    channel: "UC0HQ6UzDlpsLEBQSk5BGAuw",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_kf5iU-tF4Yf3f77tJgp_Bi7O0KMf2uf-XZd97caN0Ovz3N5sWcy3faByUleBblQUb7uQ=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1718694392.5139,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9873017072677612,
    },
    emotion: {
      label: "gratitude",
      score: 0.9454470872879028,
    },
  },
  {
    cid: "Ugz_uoknPlFa6aUyXWp4AaABAg",
    text: "This is an immediate sub what an amazing tut sir!!",
    time: "1 month ago",
    author: "@luckyknot",
    channel: "UCc1Geog884Zu1sE3dNlUkrQ",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/-9LVm8ZfMPDJqJiD8382KCzHE2LRglM2gKQPBb4SB4e9t9XlwuV4Z5WxbgSc7BIqf-KpgBBLFg=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1716361592.514436,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9822010397911072,
    },
    emotion: {
      label: "admiration",
      score: 0.9450980424880981,
    },
  },
  {
    cid: "UgxH8dgPr82gBiR9Si54AaABAg",
    text: "Incredible video. I think some corrections are needed in the player' speed tracking. They seem to be overestimating the speed. Congratulations for such an incredible project!",
    time: "1 month ago",
    author: "@pamr001",
    channel: "UC5WeGdJUzfL-ulj18yGMMRw",
    votes: "1",
    replies: "",
    photo:
      "https://yt3.ggpht.com/mEJ5qSkLsTLZkeFZcmphu7K5WsQzSH1lBwQcOguKxQQvq7GoLjxvaOTyfo-u88uBCrmOmbqWuw=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.515043,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.6690407395362854,
    },
    emotion: {
      label: "admiration",
      score: 0.9348927736282349,
    },
  },
  {
    cid: "UgwTv-5LgpfhQ8YtQwd4AaABAg",
    text: "Another great video. That too, for free. Thank you once again.",
    time: "1 month ago",
    author: "@mwaqze",
    channel: "UCZldzM90k2OAvjhbrioNcug",
    votes: "1",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_lihnyiOlU54vdr1teWAJ3puO0DN9Z8SKJw8Z24cpE=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.515688,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9875265955924988,
    },
    emotion: {
      label: "gratitude",
      score: 0.9826111197471619,
    },
  },
  {
    cid: "Ugyl1y-OFOF-OTJWiSR4AaABAg",
    text: "Wow! I've been looking for this",
    time: "2 months ago",
    author: "@femi_danjuma",
    channel: "UCnhKFUEy2CU3I6GTCMwJAXg",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_nuMxXhzihOD2LWO6f2ubDqh1-CddZ3El6PY2cH4hp62orsHLfgccgUJryPjCxoYorJGQ=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769592.871446,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9698675870895386,
    },
    emotion: {
      label: "surprise",
      score: 0.6941422820091248,
    },
  },
  {
    cid: "UgxHIhBULMhJS8aGvSZ4AaABAg",
    text: "This video so amazing. Well done 👍 👏 @Code In a Jiffy. I really love your work. God bless you",
    time: "4 weeks ago",
    author: "@joshuatheprogrammer",
    channel: "UCR9Dj0ZVzN12y8b4thQK83Q",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/aiY2rB9yKcjztVnWEdCOFYa8deI7CvgsyO_3giScO9Z-sj3NzPcQLVL55dznu8LqOq08s76GzIc=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716620792.873057,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9869347810745239,
    },
    emotion: {
      label: "admiration",
      score: 0.9054672122001648,
    },
  },
  {
    cid: "UgymRBL5-GJgfmeqX-l4AaABAg",
    text: "Great project. I can imagine it's real world use cases like displaying Distance covered, Maximum/Minimum/Avg Speed of players after a match.",
    time: "1 month ago",
    author: "@wick8070",
    channel: "UCM59tvLYgJCOY9pH_naZwTg",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/wBLlLp8XKxOzm9xe4z75qyr5B_Hx9IuTFttVLFp_X0nRGebasdlFrbZ7UaSotDqQSqcpCsCr=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.874805,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9460954070091248,
    },
    emotion: {
      label: "admiration",
      score: 0.925112783908844,
    },
  },
  {
    cid: "UgwzU62vfwQtsfaPvjJ4AaABAg",
    text: "bro I just found ur video and I have no idea what you said means cuz I barely know about AI but damn this shit looks interesting. I'm working on it and will add it to my portfolio. Please continue doing these videos",
    time: "2 months ago",
    author: "@yazanrisheh5127",
    channel: "UCZ5bHtTNVuZhMZ7B96uZa_g",
    votes: "1",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_lAnWXoQXSpNvvE_AcXpQWRgZhKkSFf1lxmhyOMabzmig_ZscSfbTZuInp2bg4XYctXVg=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769592.876283,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9080467224121094,
    },
    emotion: {
      label: "approval",
      score: 0.46015626192092896,
    },
  },
  {
    cid: "UgzLN1qYk4VX7FvOl_V4AaABAg",
    text: "You’re really good! Congrats amazing video",
    time: "1 month ago",
    author: "@alessandroceccarelli6889",
    channel: "UCtQDwaKCOidUOQLGL1BZ1CQ",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_kfLriMgZrmMk2hN0F16s04K4ICFyJhP08MeBQ1n7k=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.877715,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9858797192573547,
    },
    emotion: {
      label: "admiration",
      score: 0.9495082497596741,
    },
  },
  {
    cid: "Ugw-FUF5nWvGItNMsx14AaABAg",
    text: "great man,,,we want more project like this with streamlit application.",
    time: "1 month ago",
    author: "@mdriad4521",
    channel: "UC8EL4yWNaRM3n0tzYawjDNg",
    votes: "1",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_lCYert4-Ig8E60F_F3TpwaaAod-xbYpNEgXx6JReQHq3Y=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1716361592.878961,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9826542735099792,
    },
    emotion: {
      label: "admiration",
      score: 0.8995314240455627,
    },
  },
  {
    cid: "UgxDXB2GdCzAFTcojEV4AaABAg",
    text: "Really Thank you So much\nIndeed, a wonderful effort, and yet decided to publish this in such a wonderful way, thank you very much",
    time: "1 month ago (edited)",
    author: "@arqmnaelhelwa",
    channel: "UCLu8FmLWan9crqVlahssvGg",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ceIMifDOkwobu_wzyLwkPFKhGHMkyHLq_8uzUd37yTnvyUVchDhd9L0ApNfWn0rBDx6lb7Xh_w=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.880122,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9795249700546265,
    },
    emotion: {
      label: "gratitude",
      score: 0.9825690984725952,
    },
  },
  {
    cid: "UgwgnCTMwhVxNSCYRsh4AaABAg",
    text: "Bro you're amazing!!! \nIt makes me want to try doing something similar in C#",
    time: "1 month ago",
    author: "@marcoitalia97",
    channel: "UC1-XFa-4RFoALJEF-6ZOZGw",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_lymkGfCauJq2tOOnUfrjKG_fn4PeJs9tMBWrkNODY=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.88245,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9816412925720215,
    },
    emotion: {
      label: "admiration",
      score: 0.8822752833366394,
    },
  },
  {
    cid: "UgzNDuIcv5r318b-_WR4AaABAg",
    text: "This is a genius level work!!",
    time: "2 days ago",
    author: "@adityanjsg99",
    channel: "UCoST6kIn6twqG_qDL1TrRHw",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_l6O737V7_4jGvBC7VfrNdu6PT5RdT6c6V3t1liDNoS0i4=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1718867192.883332,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.957324206829071,
    },
    emotion: {
      label: "admiration",
      score: 0.955885648727417,
    },
  },
  {
    cid: "UgyLxza7tkWci5yaZKF4AaABAg",
    text: "great walkthrough!!",
    time: "1 month ago",
    author: "@polidactDIY",
    channel: "UCcGHMHrzYJWM1IqXH1O1R2w",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/6KzNMlKdiPbRAJb20wX9uIMbeK1yWx5hphkfX2fkflyhDaMjGl6DmT_rkBmjO0Yc6Z3o9ov8oQ=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1716361592.884431,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9779521822929382,
    },
    emotion: {
      label: "admiration",
      score: 0.9542658925056458,
    },
  },
  {
    cid: "Ugy7lp_p2ULGbT7TYxl4AaABAg",
    text: "bruh this is EPIC af",
    time: "1 month ago",
    author: "@huyphanducnhat1609",
    channel: "UCYuAKXB09dksARExVkPPnbw",
    votes: "3",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_lDi0k5sA9N8V8vVc4bDq8CxvmKSWsNq7RPQmNsvTJ0WigjL7H14K80FAFwLRegWQRu5A=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.885426,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9676299095153809,
    },
    emotion: {
      label: "neutral",
      score: 0.9663084745407104,
    },
  },
  {
    cid: "UgxDTVzSavUq0m5E9il4AaABAg",
    text: "This is just amazing Abdullah <3",
    time: "1 month ago",
    author: "@na9errrr",
    channel: "UCWWpHXtlpDI4hS2xVNmQMKw",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_n9BnNiCuhfsGdqbkcW4DTYhu6_1h7NoFObat5dJ0E=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.886409,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9816480875015259,
    },
    emotion: {
      label: "admiration",
      score: 0.9582462310791016,
    },
  },
  {
    cid: "Ugwh64nnb9j5JqX20vB4AaABAg",
    text: "Good job! Thanks very much!",
    time: "1 month ago",
    author: "@wulixu",
    channel: "UCKWYhL2_mAk6t7MWEXSA6jA",
    votes: "1",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_nolE93tOVIGI-i5n2PofA8YzHGpGLip9IUjFGlfbD4R84=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.887382,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9848785996437073,
    },
    emotion: {
      label: "gratitude",
      score: 0.977095365524292,
    },
  },
  {
    cid: "UgwAcCtl41SFLLZemG54AaABAg",
    text: "thank you for sharing your knowledge",
    time: "2 months ago",
    author: "@Fibo1022",
    channel: "UCmfzZzFmP3FaiGa-MfbX05w",
    votes: "2",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_kERGXxEZsY23iFLwFsOb5jICImMd9SNFCm6rj9hZbe4rw=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769592.888376,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9407318830490112,
    },
    emotion: {
      label: "gratitude",
      score: 0.9890397787094116,
    },
  },
  {
    cid: "UgxWxFgTNbv_qrN6YDZ4AaABAg",
    text: "This is so cool, I'm going to watch this later",
    time: "3 weeks ago",
    author: "@evandickinson3254",
    channel: "UC4ThBYfcTJttfkASxJGqRiA",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_lKzAQsQBV6H-5ZS3JKcUKMBiYsM_wNIxDm57DbkbqbThM=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1717225592.889154,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9859646558761597,
    },
    emotion: {
      label: "admiration",
      score: 0.7177287340164185,
    },
  },
  {
    cid: "UgxYKSfj3lPrh8HXYpx4AaABAg",
    text: "This is a gem of a project wow!!!",
    time: "1 month ago",
    author: "@anuomj",
    channel: "UCF22EWP9wSxYVPvrSjildkw",
    votes: "0",
    replies: "1",
    photo:
      "https://yt3.ggpht.com/d6-SlKUUeYnqB9JQiVzqAnAXMmjbm5yHiAzs5dyCrxlZ-OXj6sHPfBIZdT0IGsdmU2WG76cFTHs=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361592.891122,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9862863421440125,
    },
    emotion: {
      label: "admiration",
      score: 0.9181533455848694,
    },
  },
  {
    cid: "UgzjRGP6q5vjlPMLjZR4AaABAg",
    text: "I support this, keep working on this, I hope you can make big money by replacing the referees  especially the PGMOL",
    time: "3 weeks ago",
    author: "@krispeekornflex",
    channel: "UCD5gg2QLaPkffCSg-VcMrqg",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_n2Ef6N4qD60Ra7bAkbBz2_g1NYCA0aR_Ew9mhXEeY=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1717225592.89191,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9310045838356018,
    },
    emotion: {
      label: "optimism",
      score: 0.8123838305473328,
    },
  },
  {
    cid: "UgxYKSfj3lPrh8HXYpx4AaABAg.A3e5sxBMaJMA3e5u7lPeaU",
    text: "Thank you so much",
    time: "1 month ago",
    author: "@anuomj",
    channel: "UCF22EWP9wSxYVPvrSjildkw",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/d6-SlKUUeYnqB9JQiVzqAnAXMmjbm5yHiAzs5dyCrxlZ-OXj6sHPfBIZdT0IGsdmU2WG76cFTHs=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: true,
    time_parsed: 1716361593.245618,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.963722825050354,
    },
    emotion: {
      label: "gratitude",
      score: 0.9884385466575623,
    },
  },
  {
    cid: "UgwuI0rxYmX5KWzhzbh4AaABAg",
    text: "Masallah habibi you`re on fire ! thank you so much for tutorial",
    time: "1 month ago",
    author: "@sencxx6368",
    channel: "UCfELYm9RZIbLneTELHWmRMg",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_m0ARpgoF5mojpTabOH2f74saVewgGdm8arpKN5HRKGIQk=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361593.819187,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9834837317466736,
    },
    emotion: {
      label: "gratitude",
      score: 0.979103684425354,
    },
  },
  {
    cid: "UgxL7KeiJQ-HrOKR_J54AaABAg",
    text: "best yt recomendation 🔥",
    time: "1 month ago",
    author: "@MohammedRiyasMohamedYasin",
    channel: "UCldPyBDR5FA9QTSjBIUbHGw",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_lkd0rxDNf5fMK_UoPYRhOsgwNtwY9ZOs1KY-dpA5QhVhAqxMEwBKhHbjPdHHUvhecsUw=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361593.820752,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9760658740997314,
    },
    emotion: {
      label: "admiration",
      score: 0.8740044236183167,
    },
  },
  {
    cid: "UgytXGjCx5-GxwzN_jJ4AaABAg",
    text: "Fantastic app you developed there",
    time: "1 month ago",
    author: "@jonpaul3868",
    channel: "UC6uelOkw799sVLS8igYyQ3Q",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/SokeopwEOKQAj_4TEQU96GSy0TVsmXPLRmBPmZAq9BweYtgadL4PQ4Bz38le36hAPAgV-n-G=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361593.821956,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9819126129150391,
    },
    emotion: {
      label: "admiration",
      score: 0.9447722434997559,
    },
  },
  {
    cid: "Ugy2bqip5JJ9s1GrzxB4AaABAg",
    text: "so cool dude, please give many video about AI/ML",
    time: "3 days ago",
    author: "@pompymandislian5628",
    channel: "UCDnB9oOCFSJxxiRD9A0GpBg",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ZvmmEkIH6YJKTv6_5OJtlQQn6KpVifGqkeSAGKvkcZwgXHh2vdqW7blv2tpta6Ju8jfFlAv2_tM=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1718780793.822858,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9749189019203186,
    },
    emotion: {
      label: "admiration",
      score: 0.7560251355171204,
    },
  },
  {
    cid: "UgyGnAyPkTAKO3Omqvt4AaABAg",
    text: "Great Video! Next thing could be using this to train with reinforcement learning a FIFA bot. Would be amazing",
    time: "1 month ago",
    author: "@TheLordSocke",
    channel: "UCni5g76-KTdIUx3pjyQk4Pg",
    votes: "1",
    replies: "1",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_mo7uaYs5oZEJxaK54coS5Sjyhr26qezcPulG4ORhE=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361593.825197,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9825744032859802,
    },
    emotion: {
      label: "admiration",
      score: 0.9376674294471741,
    },
  },
  {
    cid: "UgwrKPgl8rEN_1kyUhN4AaABAg",
    text: "Incredible, thank you sir",
    time: "1 month ago",
    author: "@ducnguyen4973",
    channel: "UC3CJPMyYoT-zRWn40JoqsXA",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_mWxl030Rpw3sP07pE1SgmmElQ4kMT11QR6d3lkxZaCi2c=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1716361593.826336,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9742101430892944,
    },
    emotion: {
      label: "gratitude",
      score: 0.9852815270423889,
    },
  },
  {
    cid: "UgxjDkZkpzzbkH_yaEN4AaABAg",
    text: "wow, what a good job from you",
    time: "2 months ago",
    author: "@NamLeHoang-xg1th",
    channel: "UCEF_TYkXoUDf1grprzGiRpQ",
    votes: "1",
    replies: "",
    photo:
      "https://yt3.ggpht.com/L-U0KjrCjL3IHe1GY5u445p7OA1md3p-CjP4urZ21eSy4Jh8Sa1QBcN-tLMqvz1yrqI4otg2=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769593.827329,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9808734059333801,
    },
    emotion: {
      label: "admiration",
      score: 0.9532743096351624,
    },
  },
  {
    cid: "UgyMMZnzi50397dpqkJ4AaABAg",
    text: "Amazing and inspiring work my freind! Thank you for sharing your knowledge so handfull! I am intrested in implementing a similar model my self and i have some questions. Do you believe that the model could detect the distance of each player from a specific standard point in the field, like the field to be a 2D diagram and each player having an X and an Y coordinate assuming the (0,0) point is the bottom left corner ? Also do you think this works with footage from different matches where the main camera will have different settings ? \nThank you !!",
    time: "1 month ago",
    author: "@HumanDeveloperHumdev",
    channel: "UChgKop89OgOhwJwQ4MpM9MQ",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_kGJzQne4tLxXgvjd2qdB4-ZxFvdKrEml04CMC_OW9Qbpq0uVjTTkyvuZ_aG_JA0VwRMg=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1716361593.828288,
    translated: false,
    sentiment: {
      label: "positive",
      score: 0.9663046002388,
    },
    emotion: {
      label: "gratitude",
      score: 0.8393328189849854,
    },
  },
  {
    cid: "UgyeTy3o_TW0sfk8_uB4AaABAg",
    text: "Gran trabajo, star en github , like y nuevo suscriptor en youtube, felicitaciones, saludos desde Argentina!!",
    time: "2 months ago",
    author: "@nano996",
    channel: "UC1IwXzQEdFqOkIK4_AB8n4g",
    votes: "2",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_luVHgbMimDhecfDqPrm8Jz3PvL877j8-O8U5hbqBdeoBc=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769592.509945,
    translated:
      "Great job, star on github, like and new subscriber on YouTube, congratulations, greetings from Argentina!!",
    sentiment: {
      label: "positive",
      score: 0.9891592860221863,
    },
    emotion: {
      label: "admiration",
      score: 0.8501321077346802,
    },
  },
  {
    cid: "UgzR1aemx5DGLygu4pt4AaABAg",
    text: "excellent video tutorial, congragulations!",
    time: "1 month ago",
    author: "@turanag",
    channel: "UCVp9YsWDnzPl7dc8X1HLdfg",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_kj-75AZUjKhbqcf6dC6C-aK7JSMCGegetr4JR2qRQ=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1716361592.881274,
    translated: "excellent video tutorial, congragulations!",
    sentiment: {
      label: "positive",
      score: 0.9884519577026367,
    },
    emotion: {
      label: "admiration",
      score: 0.9342576861381531,
    },
  },
  {
    cid: "UgyeDd0YFoEVNzcSc7R4AaABAg",
    text: "I think you are king, keep going",
    time: "2 months ago",
    author: "@AhmedReda-bt3wx",
    channel: "UCHSl9IvgnMsH7HBf45QellQ",
    votes: "1",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_nLOZiVoOnOY9sRG6PEfbeJQZgNEc94Ld_-R0YhapW-QHpFlNNHtQIwpPu8VJKX5wVYKg=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769592.890126,
    translated: "I think you are king, keep going",
    sentiment: {
      label: "positive",
      score: 0.951330840587616,
    },
    emotion: {
      label: "admiration",
      score: 0.7380825281143188,
    },
  },
  {
    cid: "UgzFVxwgovrjTUrWROh4AaABAg",
    text: "Amazing Job. Thanks a lot man!!",
    time: "2 weeks ago",
    author: "@phoomiphat1",
    channel: "UC9KWOGiUs03Xr31bNGMCSKQ",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/njJg-X66iB6gDmud_6ARdSlkrkdMebnSqDHcVIMY0l8-U2WuNkDMafE3dMowEn4heNAkrENIfw=s88-c-k-c0x00ffffff-no-rj",
    heart: false,
    reply: false,
    time_parsed: 1717830392.8926,
    translated: "Amazing Job. Thanks a lot man!!",
    sentiment: {
      label: "positive",
      score: 0.984892725944519,
    },
    emotion: {
      label: "gratitude",
      score: 0.9747276902198792,
    },
  },
  {
    cid: "UgyM21bCVi9ZZb88CdZ4AaABAg",
    text: "Pretty interresting Video sir.",
    time: "2 months ago",
    author: "@TheWizardEngineer",
    channel: "UCTGJMx-4gK0cqCUdLUNWSKQ",
    votes: "2",
    replies: "",
    photo:
      "https://yt3.ggpht.com/BUD1f4PCwTUJwwcflDcjqHzbPpDaNIq3CyFMbK01l-pthJsMCMaBhPT08yR2AtrSXXAzUvuRyMo=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769593.824037,
    translated: "Pretty interresting Video sir.",
    sentiment: {
      label: "positive",
      score: 0.9735245704650879,
    },
    emotion: {
      label: "admiration",
      score: 0.9218839406967163,
    },
  },
  {
    cid: "UgzQnXCVercZT3uvsfl4AaABAg",
    text: "الله يعطيك العافية 👏",
    time: "2 months ago",
    author: "@majidraimi",
    channel: "UCzMLVXwcmEORwnveaHUuM2g",
    votes: "0",
    replies: "",
    photo:
      "https://yt3.ggpht.com/ytc/AIdro_kJN-D9rlPQVrYYfOyN0XbAm8qIfmXG_Ia4IMGwkUcbsw0=s88-c-k-c0x00ffffff-no-rj",
    heart: true,
    reply: false,
    time_parsed: 1713769593.829253,
    translated: "May God give you wellness 👏",
    sentiment: {
      label: "positive",
      score: 0.9321216344833374,
    },
    emotion: {
      label: "caring",
      score: 0.8463204503059387,
    },
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
interface CommentSectionprops {
  ytid: string;
}
const CommentSectionWrapper = ({ ytid }: CommentSectionprops) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CommentProvider>
        <CommentSecton ytid={ytid} />
      </CommentProvider>
    </QueryClientProvider>
  );
};
export default CommentSectionWrapper;

const CommentSecton = ({ ytid }: CommentSectionprops) => {
  useFetchComments(ytid);
  const { range } = useCommentContext();
  return (
    <div className="flex flex-col gap-6 mt-2">
      <p className={cn("text-center", heading.className)}>
        You are viewing page {range.stop / 50}
      </p>
      <Tabs defaultValue="sentiment" className="w-full">
        <TabsList className="w-full flex">
          <TabsTrigger value="sentiment" className="flex-1">
            Sentiment Detection
          </TabsTrigger>
          <TabsTrigger value="emotion" className="flex-1">
            Emotion Detection
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sentiment">
          <SentimentTab />
        </TabsContent>
        <TabsContent value="emotion">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};
