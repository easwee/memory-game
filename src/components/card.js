export class Card {
  constructor({ index, value, x, y, radius, graphic }) {
    this._id = `card-${index + 1}`;
    this._index = index + 1;
    this._value = value;
    this._position = {
      x,
      y,
    };
    this._element = null;
    this._size = radius;
    this._name = graphic.name;
    this._src = graphic.url;

    this._render();
  }

  remove() {
    this._element.remove();
  }

  getIndex() {
    return this._index;
  }

  getValue() {
    return this._value;
  }

  flip() {
    this._element.classList.toggle("flipped");
  }

  matched() {
    this._element.classList.add("matched");
  }

  _render() {
    const card = document.createElement("div");

    card.setAttribute("id", this._id);
    card.setAttribute("class", "card");
    card.setAttribute(
      "style",
      `position: fixed;
         top: ${this._position.y}px;
         left: ${this._position.x}px;
         width: ${this._size}px;
         height: ${this._size}px;
        `
    );
    card.innerHTML = `
        <div class="inner">
          <div class="front" style="font-size: ${
            this._size * 0.7
          }px; border-width: ${this._size * 0.1}px">${this._index}</div>
          <div class="back"  style="border-width: ${this._size * 0.1}px">
            <img src="${this._src}" alt="${this._name}" />
          </div>
        </div>
      `;

    document.body.appendChild(card);

    this._element = document.getElementById(this._id);
  }
}
