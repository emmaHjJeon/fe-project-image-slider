export default class ImageSlider {
  #currentPosition = 0; // 현재 슬라이드 이미지 번호
  #sliderNumber = 0;
  #sliderWidth = 0;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSliderWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
  }

  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.prevBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
  }

  initSliderNumber() {
    this.#sliderNumber = this.sliderListEl.querySelectorAll('li').length;
  }

  initSliderWidth() {
    this.#sliderWidth = this.sliderWrapEl.clientWidth;
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${
      this.#sliderNumber * this.#sliderWidth
    }px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.prevBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
  }

  moveToRight(event) {
    this.#currentPosition++;

    if (this.#currentPosition === this.#sliderNumber) {
      this.#currentPosition = 0;
    }

    this.sliderListEl.style.left = `-${
      this.#sliderWidth * this.#currentPosition
    }px`;

    this.setIndicator();
  }

  moveToLeft(event) {
    this.#currentPosition--;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#sliderNumber - 1;
    }

    this.sliderListEl.style.left = `-${
      this.#sliderWidth * this.#currentPosition
    }px`;

    this.setIndicator();
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#sliderNumber; i++) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }

    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }

  setIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }

  onClickIndicator() {
    const indexPosition = parseInt(event.target.dataset.index, 10);
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.sliderListEl.style.left = `-${
        this.#sliderWidth * this.#currentPosition
      }px`;
      this.setIndicator();
    }
  }
}
