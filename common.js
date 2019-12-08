window.dict = {
  "- more information -": "- 详情 -",
  "tr-home-1": "华南理工大学队即将参与在2020举行的中东国际太阳能十项全能竞赛（Solar Decathlon Middle Ease，SDME）是以全球高校为参赛单位的太阳能建筑科技竞赛。该竞赛由十个单项比赛组成，因此得名“十项全能”竞赛。竞赛目的是借助世界顶尖研发、设计团队的技术与创意，将太阳能、节能与建筑设计以一体化的新方式紧密结合，设计、建造并运行一座高效节能、由吸引力的太阳能房屋，并希望通过比赛加快太阳能国际化的产学研融合与交流，推进相关技术创新、发展和商业化。",
  "tr-home-2": "华南理工大学队汇集了华工多方面的力量，包括建筑学院、材料学院、新闻与传播学院的本硕博学生。队伍有专业教师团队指导，并有学校与学院众多机构的支持，包括亚热带建筑科学国家重点实验室、数字化建造实验室、华南理工大学建筑设计研究院有限公司、发光材料与器材国家重点实验室。",
  "Solar Decathlon in U.S": "美国太阳能十项全能竞赛",
  "Solar Decathlon in China": "中国太阳能十项全能竞赛",
  "sd-1": "国际太阳能十项全能竞赛（Solar Decathlon，SD）是由美国能源部发起并主办的，以全球高校为参赛单位的太阳能建筑科技竞赛。",
  "sd-2": "该竞赛由十个单项比赛组成，因此得名“十项全能”竞赛。目的是借助世界顶尖研发、设计团队的技术与创意，将太阳能、节能与建筑设计以一体化的新方式紧密结合，设计、建造并运行一座高效节能、由吸引力的太阳能房屋，并希望通过比赛加快太阳能国际化的产学研融合与交流，推进相关技术创新、发展和商业化。",
  "sd-3": "自2002年开始，大赛在美国、欧洲、中国、中东等国家地区成功举办，吸引了来自全球100多所大学参加比赛，展示了世界最新能源技 术成果以及能源节约技术。"
};


// 翻译组件
window.zh = false;
window.tr = function (el) {
  var en = $(el).attr("data-tr");
  var key = $(el).attr("data-tr-key");
  if (!key) {
    key = en;
  }
  if (window.zh) {
    if (!!$(el).attr("data-tr-zh")) {
      $(el).text($(el).attr("data-tr-zh"));
    } else {
      $(el).text(window.dict[key]);
    }
    return;
  }
  $(el).text(en);
};
window.toggleLocale = function (nochange) {
  if (!nochange) {
    window.zh = !window.zh;
  }
  $("[data-tr]").map(function (id, el) {
    tr(el);
  });
};
window.reloadLocale = function () {
  $("[data-tr]").map(function (id, el) {
    if (!!$(el).attr("data-tr-inited"))
      return;
    if (!!$(el).attr("data-tr-key")) {
      return;
    }

    if ($(el).attr("data-tr") == "") {
      $(el).attr("data-tr", $(el).text());
    } else {
      $(el).text($(el).attr("data-tr"));
    }

    $(el).attr("data-tr-inited", "true");
  });
  $("[data-tr-key],[data-tr-zh]").map(function (i, el) {
    if (!!$(el).attr("data-tr-inited"))
      return;
    $(el).attr("data-tr", $(el).text());
    $(el).attr("data-tr-inited", "true");
  });
  toggleLocale(true);
};

// 初始化 roller
var imgCur = {};
var imgTot = {};
function reloadRoller() {
  $(".tmc-img-roller").map(function (i, el) {
  var rid = $(el).attr("id");
  if (!rid)
    console.error("cnm 忘记给 roller 设 id 了", el);
  if (!window.imgCur[rid])
    window.imgCur[rid] = 0;
  window.imgTot[rid] = $(el).children().length;
});
}
// 初始化结束

// 前端路由加载器
function load(page) {
  if (!!page == "") page = "home";
  $("#app").load("./components/" + page + ".html", null, function () {
    reloadLocale();
    reloadRoller();
    // 加载完毕，如果导航栏处于打开状态，收起之
    var expanded = Number($(".tmc-navbar").attr("data-expanded"));
    if (expanded == 0) return;
    $(".tmc-navbar").animate({
      right: expanded == 0 ? "0px" : "-85vw"
    });
    $(".tmc-navbar").attr("data-expanded", 1 - expanded);
  });
}
window.onhashchange = function (e) {
  if (window.location.hash == "") return;
  var hash = window.location.hash.substr(1);
  // 用于给各个单独的组件取消注册一些定时器之类的
  if (typeof window.beforeLoad == "function") {
    window.beforeLoad();
  }
  load(hash);
};

// 在页面载入完成后执行各组件的初始化
$(function () {
  // load 完成后会自动重新载入 roller 和 locale，这里就不用手动重载入了
  load(window.location.hash.substr(1));
});
