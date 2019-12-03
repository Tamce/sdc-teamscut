window.dict = {
  "Contest Information": "信息",
  "Solar Decathlon": "太阳能",
  "2020 Solar Decathlon Middle East": "",
  "About us": "",
  "South China University of Technology": "",
  "Team x SCUT": "",
  "Team Members": "",
  "Project": "",
  "Work Schedule": "",
  "Concept": "",
  "Activities": "",
  "Media Engagement": "",
  "Offical Activities": "",
  "Offline Activities": "",
  "Former Works": "",
  "Support": "",
  "Sponsors": "",
  "Media Partners": "",
  "Support TeamSCUT": "",
  "Contacts": ""
};
window.zh = false;
window.tr = function (el) {
  var en = $(el).attr("data-tr");
  if (window.zh) {
    $(el).text(window.dict[en]);
    return;
  }
  $(el).text(en);
}
window.toggleLocale = function () {
  window.zh = !window.zh;
  $("[data-tr]").map(function (id, el) {
    tr(el);
  });
}
$(function () {
  $("[data-tr]").map(function (id, el) {
    if ($(el).attr("data-tr") == "") {
      $(el).attr("data-tr", $(el).text());
    } else {
      $(el).text($(el).attr("data-tr"));
    }
  });
});
