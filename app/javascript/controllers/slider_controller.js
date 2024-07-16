import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["dot"];
  static values = { index: Number }

  connect() {
    this.indexValue = 0;
    this.showSlide();
    this.startAutoSlide();
    console.log("Slide controller connected", this.indexValue);
  }

  disconnect() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    clearInterval(this.interval);
  }

  showSlide(index = this.indexValue) {
    const sliders = this.element.querySelectorAll('.slider__bg');
    sliders.forEach((slider, i) => {
      slider.style.display = i === index ? 'block' : 'none';
    });
    this.dotTargets.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    this.indexValue = index;
  }

  nextSlide() {
    this.indexValue = (this.indexValue + 1) % this.dotTargets.length;
    this.showSlide();
  }

  goToSlide(event) {
    console.log('Clicked')
    const index = parseInt(event.currentTarget.dataset.index);
    this.stopAutoSlide();
    this.showSlide(index);
    this.startAutoSlide();
    console.log('After click go to slide', index);
  }
}

