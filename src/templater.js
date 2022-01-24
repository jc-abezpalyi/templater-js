const Templater = {
  //step 1
  run: function () {
    this.tags.forEach(tag => {
      this.render(tag.template, tag.element);
    });
  },
  //step 2,3
  tags: [],
  buttonsText: [],
  addTag: function (tag, template) {
    [...document.querySelectorAll(`${tag}`)].forEach((el, index) => {
      let currentTemplate = template;
      const attrList = [...el.attributes];

      this.buttonsText.push(el.innerText);

      attrList.forEach(attr => {
        if (!currentTemplate.includes(attr.localName)) {
          let addAttr = currentTemplate.split('>');

          addAttr[0] = `${addAttr[0]} ${attr.localName}="${attr.value}"`;
          currentTemplate = addAttr.join('>');
        }
      });
      currentTemplate = currentTemplate.replace('{{html}}', this.buttonsText[index] || 'Some Text');
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
    const text = this.children().text().trim();
    $(this.children()).each(function() {
      $.each(this.attributes, function() {
        if(this.specified) {
          tags.button = tags.button.replace(`{{${this.name}}}`, this.value);
        }
      });
    });
    this.html(tags.button.replace(/{{(.*?)}}/, text || 'Some Text'))
  }
})(jQuery);
