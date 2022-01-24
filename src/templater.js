const Templater = {
  //step 1
  run: function () {
    this.tags.forEach(tag => {
      this.render(tag.template, tag.element);
    });
  },
  //step 2,3
  tags: [],
  addTag: function (tag, template) {
    [...document.querySelectorAll(`${tag}`)].forEach(el => {
      let currentTemplate = template;
      let attrList = [...el.attributes];

      attrList.forEach(attr => {
        currentTemplate = currentTemplate.replace(`{{${attr.localName}}}`, attr.value);
        currentTemplate = currentTemplate.replace(`{{html}}`, `${el.innerHTML === '{{html}}' ? el.innerHTML : 'Some Text'}`);
      });
      this.tags.push({
        element: el,
        template: currentTemplate,
      });
    });
  },
  render: (template, element) => {
    element.outerHTML = template;
  },
};
//   //step 4,5

;(function ($) {
  $.fn.templater = run;
  function run({ tags }) {
    let currentTag = this.children()[0];
    let text = this.children().text().trim();
    Object.values(currentTag.attributes).forEach(attr => {
      tags.button = tags.button.replace(`{{${attr.localName}}}`, attr.value);
    });
    this[0].innerHTML = tags.button.replace(/{{(.*?)}}/, text);
  }
})(jQuery);