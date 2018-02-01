function trendSearch(keyword, geo, time) {
    var explorQuery = "q=" + keyword + "geo=" + geo + "&date=" + time;
    trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":keyword,"geo":geo,"time":time}],"category":0,"property":""}, {"exploreQuery":explorQuery,"guestPath":"https://trends.google.com:443/trends/embed/"});
}
