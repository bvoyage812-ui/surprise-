const envelope = document.getElementById('envelope') || document.getElementById('bouquet');
const envelopeAnimation = document.getElementById('envelopeAnimation');
const intro = document.getElementById('intro');
const messageScreen = document.getElementById('messageScreen');
const scatteredFlowers = document.getElementById('scatteredFlowers');
const secretTrigger = document.getElementById('secretTrigger');
const heartPopout = document.getElementById('heartPopout');
const heartPopoutContent = document.querySelector('.heart-popout-content');
const heartPopoutClose = document.querySelector('.heart-popout-close');
const flowers = ['🌸', '🌷', '🌺', '🌼', '🌹', '✿', '♡'];
let opened = false;

if (secretTrigger && heartPopout && heartPopoutContent && heartPopoutClose) {
	const closeHeartPopout = () => {
		heartPopout.hidden = true;
		heartPopout.setAttribute('aria-hidden', 'true');
		secretTrigger.setAttribute('aria-expanded', 'false');
		messageScreen.inert = false;
		secretTrigger.focus();
	};

	secretTrigger.addEventListener('click', () => {
		heartPopout.hidden = false;
		heartPopout.setAttribute('aria-hidden', 'false');
		secretTrigger.setAttribute('aria-expanded', 'true');
		messageScreen.inert = true;
		heartPopoutClose.focus();
	});

	heartPopoutClose.addEventListener('click', closeHeartPopout);
	heartPopout.addEventListener('click', (event) => {
		if (event.target === heartPopout) closeHeartPopout();
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && !heartPopout.hidden) closeHeartPopout();
	});
}

if (envelopeAnimation && typeof envelopeAnimation.stop === 'function') {
	envelopeAnimation.stop();
}

if (envelope) {
	envelope.addEventListener('click', () => {
		if (opened) return;
		opened = true;
		envelope.disabled = true;
		envelope.classList.add('is-opening');
		createBurst();

		if (envelopeAnimation && typeof envelopeAnimation.play === 'function') {
			envelopeAnimation.stop();
			requestAnimationFrame(() => envelopeAnimation.play());
		}

		window.setTimeout(() => {
			intro.classList.add('is-leaving');
			messageScreen.classList.add('is-visible');
			messageScreen.setAttribute('aria-hidden', 'false');
			createScatteredFlowers();
		}, 0);
	});
}

function createBurst() {
	const burst = document.createElement('div');
	burst.className = 'burst';
	document.body.appendChild(burst);

	for (let index = 0; index < 32; index += 1) {
		const flower = document.createElement('span');
		const angle = Math.random() * Math.PI * 2;
		const distance = 130 + Math.random() * Math.min(window.innerWidth * .38, 250);
		flower.className = 'burst-flower';
		flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
		flower.style.fontSize = `${17 + Math.random() * 21}px`;
		flower.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
		flower.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
		flower.style.setProperty('--turn', `${Math.random() * 540 - 270}deg`);
		flower.style.animationDelay = `${Math.random() * .18}s`;
		burst.appendChild(flower);
	}

	window.setTimeout(() => burst.remove(), 1600);
}

function createScatteredFlowers() {
	const count = window.innerWidth < 600 ? 20 : 34;
	for (let index = 0; index < count; index += 1) {
		const flower = document.createElement('span');
		flower.className = 'scattered-flower';
		flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
		flower.style.left = `${Math.random() * 96 + 2}%`;
		flower.style.top = `${Math.random() * 94 + 3}%`;
		flower.style.fontSize = `${18 + Math.random() * 25}px`;
		flower.style.setProperty('--turn', `${Math.random() * 60 - 30}deg`);
		flower.style.setProperty('--flower-opacity', `${.28 + Math.random() * .42}`);
		const settleDelay = Math.random() * .8;
		flower.style.setProperty('--settle-delay', `${settleDelay}s`);
		flower.style.setProperty('--float-delay', `${1.2 + settleDelay}s`);
		flower.style.setProperty('--float-duration', `${6 + Math.random() * 5}s`);
		flower.style.setProperty('--drift-x', `${Math.random() * 36 - 18}px`);
		flower.style.setProperty('--drift-y', `${Math.random() * 40 - 20}px`);
		scatteredFlowers.appendChild(flower);
	}
}

const albumModal = document.getElementById('albumModal');
const albumModalText = document.getElementById('albumModalText');
const albumModalClose = document.querySelector('.album-modal-close');
const albumBackdrop = document.querySelector('.album-modal-backdrop');
const albumPhotos = document.querySelectorAll('.collage-photo');

if (albumModal && albumModalText) {
	const closeAlbumModal = () => {
		albumModal.classList.remove('is-open');
		albumModal.setAttribute('aria-hidden', 'true');
	};

	albumPhotos.forEach((photo) => {
		photo.addEventListener('click', () => {
			const message = photo.dataset.message || 'your message';
			albumModalText.textContent = message;
			albumModal.classList.add('is-open');
			albumModal.setAttribute('aria-hidden', 'false');
		});
	});

	if (albumModalClose) {
		albumModalClose.addEventListener('click', closeAlbumModal);
	}

	if (albumBackdrop) {
		albumBackdrop.addEventListener('click', closeAlbumModal);
	}

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && albumModal.classList.contains('is-open')) {
			closeAlbumModal();
		}
	});
}
