/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { appContent } from './dom_elements';
import { t } from './translations';

let imageModal: HTMLElement | null = null;
let modalImageContent: HTMLImageElement | null = null;
let modalCaptionElement: HTMLElement | null = null;

export function createImageModalStructure() {
    if (document.getElementById('imageModal')) return; // Already created

    imageModal = document.createElement('div');
    imageModal.id = 'imageModal';
    imageModal.className = 'image-modal';
    imageModal.setAttribute('aria-hidden', 'true');
    imageModal.setAttribute('role', 'dialog');
    imageModal.setAttribute('aria-modal', 'true');
    imageModal.setAttribute('aria-labelledby', 'modalCaption');
    imageModal.style.display = 'none';

    const closeButton = document.createElement('span');
    closeButton.className = 'close-modal-btn';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', t('image_modal.close_aria_label'));
    closeButton.onclick = closeModal;

    modalImageContent = document.createElement('img');
    modalImageContent.className = 'modal-image-content';
    modalImageContent.alt = t('image_modal.default_alt'); 

    modalCaptionElement = document.createElement('div');
    modalCaptionElement.id = 'modalCaption';
    modalCaptionElement.className = 'modal-caption';


    imageModal.appendChild(closeButton);
    imageModal.appendChild(modalImageContent);
    imageModal.appendChild(modalCaptionElement);
    document.body.appendChild(imageModal);

    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal && imageModal.style.display !== 'none') {
            closeModal();
        }
    });
}

export function closeModal() {
    if (imageModal) {
        imageModal.style.display = 'none';
        imageModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
         if (modalImageContent) modalImageContent.src = ''; // Clear image src
    }
}

export function openModal(imageSrc: string, imageAlt?: string, captionText?: string) {
    if (imageModal && modalImageContent && modalCaptionElement) {
        modalImageContent.src = imageSrc;
        modalImageContent.alt = imageAlt || t('image_modal.enlarged_view_alt');
        modalCaptionElement.textContent = captionText || imageAlt || '';
        imageModal.style.display = 'flex';
        imageModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

export function setupImageModalEventListeners() {
    appContent.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const triggerImage = target.closest('.modal-trigger-image') as HTMLElement | null; 

        if (triggerImage && triggerImage.matches('.sample-question-image.modal-trigger')) {
            const imageSrc = triggerImage.getAttribute('src');
            const imageAlt = triggerImage.getAttribute('alt'); // Already translated if set via t()
            const caption = triggerImage.dataset.caption; // Already translated if set via t()
            if (imageSrc) {
                openModal(imageSrc, imageAlt || undefined, caption || imageAlt || undefined);
            }
        }
    });
}
