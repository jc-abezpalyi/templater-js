const Templater = {
  //step 1
  run: function () {
    this.tags.forEach(tag => {
      this.render(tag.template, tag.element);
    });
  },
  //step 2,3
  tags: [],
  buttonsText:[],
  addTag: function (tag, template) {
    [...document.querySelectorAll(`${tag}`)].forEach((el,index) => {
      let currentTemplate = template;
      const attrList = [...el.attributes];

      this.buttonsText.push(el.innerText)

      attrList.forEach(attr => {
        if(currentTemplate.indexOf(attr.localName) === -1){
          let addAttr = currentTemplate.split(' ')
          addAttr[0]=`${addAttr[0]} ${attr.localName}=${attr.value}`
          currentTemplate = addAttr.join(" ")
        }
        currentTemplate = currentTemplate.replace(`{{${attr.localName}}}`, attr.value );
      });
      currentTemplate = currentTemplate.replace(`{{html}}`, !this.buttonsText[index] ? 'Some Text'  : this.buttonsText[index] );
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
    let [currentTag] = this.children();
    let text = this.children().text().trim();
    Object.values(currentTag.attributes).forEach(attr => {
      tags.button = tags.button.replace(`{{${attr.localName}}}`, attr.value);
    });
    this[0].innerHTML = tags.button.replace(/{{(.*?)}}/, text||'Some Text');
  }
})(jQuery);