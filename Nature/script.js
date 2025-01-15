function ibg() {
	let ibg = document.querySelectorAll(".ibg");

	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();

document.addEventListener('DOMContentLoaded', function () {
	const burgerItem = document.querySelector('.header__burger-menu');
	const menuBody = document.querySelector('.menu__body');
	const links = document.querySelectorAll('.menu__link');
	const init = false

	burgerItem.addEventListener('click', () => {
		menuBody.classList.toggle('active');

		if (!init)
			menuBody.classList.add('active__init');
	});

	links.forEach(link => {
		link.addEventListener('click', () => {
			menuBody.classList.remove('active');
		});
	});
});


document.addEventListener('DOMContentLoaded', function () {
	const sliderBody = document.querySelector('.slider__body');
	const sliderItems = document.querySelectorAll('.slider__item');
	const indicators = document.querySelectorAll('.indicator');
	let currentIndex = 0;

	function updateSliderPosition() {
		const offset = -currentIndex * 100;
		sliderBody.style.transform = `translateX(${offset}%)`;

		indicators.forEach((indicator, index) => {
			indicator.classList.toggle('active', index === currentIndex);
		});
	}

	indicators.forEach((indicator) => {
		indicator.addEventListener('click', function () {
			currentIndex = parseInt(this.getAttribute('data-slide'), 10);
			updateSliderPosition();
		});
	});

	let startX;
	sliderBody.addEventListener('touchstart', function (e) {
		startX = e.touches[0].clientX;
	});

	sliderBody.addEventListener('touchmove', function (e) {
		const endX = e.touches[0].clientX;
		const diff = startX - endX;

		if (diff > 50) {
			currentIndex = (currentIndex + 1) % sliderItems.length;
			updateSliderPosition();
		} else if (diff < -50) {
			currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
			updateSliderPosition();
		}
	});

	updateSliderPosition();
});

(function () {

	const smoothScroll = function (targetEl, duration) {
		const headerElHeight = document.querySelector('.header').clientHeight;
		let target = document.querySelector(targetEl);
		let targetPosition = target.getBoundingClientRect().top - headerElHeight;
		let startPosition = window.scrollY;
		let startTime = null;

		const ease = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};

		const animation = function (currentTime) {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const run = ease(timeElapsed, startPosition, targetPosition, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		};
		requestAnimationFrame(animation);

	};

	const scrollTo = function () {
		const links = document.querySelectorAll('.js-scroll');
		links.forEach(each => {
			each.addEventListener('click', function () {
				const currentTarget = this.getAttribute('href');
				smoothScroll(currentTarget, 1000);
			});
		});
	};
	scrollTo();
}());

(function () {
	const header = document.querySelector('.header');
	window.onscroll = () => {
		if (window.scrollY > 50) {
			header.classList.add('show');
		}
		else {
			header.classList.remove('show');
		}
	};
}());