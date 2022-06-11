// HTML elements
const elParrotsForm = document.querySelector("#form-parrots");
const elSearchForm = document.querySelector("#search_form");
const elPriceFrom = document.querySelector("#price_from");
const elSortBySelect = document.querySelector("#sortby")
const elPriceTO = document.querySelector("#price_to");
const elFromWidth = document.querySelector("#from_width");
const elFromToWidth = document.querySelector("#from_to");
const elFromHeight = document.querySelector("#from_height");
const elFromToHeight = document.querySelector("#to_height");
const elCountResult = document.querySelector("#result-count")
const elWrapperList = document.querySelector(".parrots-wrapper")
const elParrotsTemplate = document.querySelector("#parrots-template").content;
const elFavoriteParrotInfo = document.querySelector("#local-parrots");

// Ma'lumotni chiqarish
const createParrots = (parrot) => {
    
    const elParrotDiv = elParrotsTemplate.cloneNode(true); 
    
    const elFormBtnDelete = elParrotDiv.querySelector(".delete-btn");
    elFormBtnDelete.dataset.id = parrot.id;
    
    const elFormBtnEdit = elParrotDiv.querySelector(".edit-btn");
    elFormBtnEdit.dataset.id = parrot.id;
    
    const elParrotsImg = elParrotDiv.querySelector(".card-img-top");
    elParrotsImg.src = parrot.img;
    
    const elParrotsTitle = elParrotDiv.querySelector(".card-title");
    elParrotsTitle.textContent = parrot.title;
    
    const elParrotsPrice = elParrotDiv.querySelector(".card-price");
    elParrotsPrice.textContent = parrot.price; 
    elParrotsPrice.classList.add("text-warning")
    
    const elParrotSize = elParrotDiv.querySelector(".badge");
    elParrotSize.textContent = `${parrot.sizes.width}sm x ${parrot.sizes.height}sm`;
    
    
    const elParrotsDate = elParrotDiv.querySelector(".card-text");
    elParrotsDate.textContent = parrot.birthDate;
    
    const elParrotsInfo = elParrotDiv.querySelector(".info");
    elParrotsInfo.textContent = parrot.features.split(" ");
    
    
    return elParrotDiv 
    
    
}


const renderParrots = (parrotArray = parrots) => {
    elWrapperList.innerHTML = "";
    
    elCountResult.textContent = `Count: ${parrotArray.length}`;
    
    parrotArray.forEach((parrot) => {
        const elParrots = createParrots(parrot);
        elWrapperList.append(elParrots);
    });
}

renderParrots()


//Qo'shish ma'lumotni
const addParrotsForm = document.querySelector("#add-parrots-form");

addParrotsForm.addEventListener("submit", (evt) => {
    
    evt.preventDefault();
    
    const formElements = evt.target.elements;
    
    const nameInputValue = formElements.title.value.trim();
    const imgSrcInputValue = formElements.img.value;
    const priceInputValue = +formElements.price.value.trim();
    const newDateInputValue = formElements.date.value;
    const parrotFormWidthValue = formElements.width.value.trim();
    const parrotFormHeightValue = formElements.height.value.trim();
    const featuresFormValue = formElements.features.value.trim();
    
    
    
    
    if (nameInputValue && imgSrcInputValue  && newDateInputValue && featuresFormValue){
        
        const addingParrot = {
            
            id: Math.floor(Math.random() * 10),
            title: nameInputValue,
            img: imgSrcInputValue,
            price: priceInputValue,
            birthDate: newDateInputValue,
            sizes: parrotFormWidthValue,
            sizes: parrotFormHeightValue,
            features: featuresFormValue,
            
        }
        
        
        parrots.push(addingParrot);
        
        const elNewObj = createParrots(addingParrot);
        elWrapperList.prepend(elNewObj);
        addParrotsForm.reset();
    }
    
    
    
});


// HTML elements edit
const elEditModal = new bootstrap.Modal("#edit-student-modal");
const elEditForm = document.querySelector("#edit-parrots-form");
const elEditTitle = elEditForm.querySelector("#edit-title");
const elEditImg = elEditForm.querySelector("#edit-img");
const elEditPrice = elEditForm.querySelector("#edit-price");
const elEditDate = elEditForm.querySelector("#edit-date");
const elEditWidth = elEditForm.querySelector("#edit-width");
const elEditHeight = elEditForm.querySelector("#edit-height");
const elEditFeatures = elEditForm.querySelector("#edit-features");

// Delete qilish
elWrapperList.addEventListener("click", (evt) => {
    
    if (evt.target.matches(".delete-btn")) {
        const clickedBtnId = +evt.target.dataset.id;
        const clicedBtnIndex = parrots.findIndex((parrotkakaku) => {
            return parrotkakaku.id === clickedBtnId
        });
        
        parrots.splice(clicedBtnIndex, 1);
        
        renderParrots()
    }
    
    
    if (evt.target.matches(".btn-secondary")) {
        
        const clickedBtnId = +evt.target.dataset.id;
        const clickedBtnAdd = parrots.find((parrot) => parrot.id === clickedBtnId)
        console.log(clickedBtnAdd);
        
        if (clickedBtnAdd) {
            
            elEditTitle.value = clickedBtnAdd.title || "";
            elEditImg.value = clickedBtnAdd.img;
            elEditPrice.value = clickedBtnAdd.price ;
            elEditDate.value = clickedBtnAdd.birthDate;
            elEditWidth.value = clickedBtnAdd.sizes.width ;
            elEditHeight.value = clickedBtnAdd.sizes.height;
            elEditFeatures.value = clickedBtnAdd.features || "";
            
            elEditForm.dataset.id = clickedBtnId
        }
    }
});


elEditForm.addEventListener("submit", (evt) => {
    
    evt.preventDefault();
    
    const submittingItemId = +evt.target.dataset.id;
    const titleValue = elEditTitle.value.trim();
    const editImg = elEditImg.value;
    const editPriceValue = +elEditPrice.value;
    const editDateValue = elEditDate.value; 
    const editWidthValue = elEditWidth.value.split(", ");
    const editHeight = elEditHeight.value.split(", ");
    const editFeaturesValue = elEditFeatures.value.trim();
    
    
    if (titleValue   &&   editPriceValue && editDateValue && editFeaturesValue) {
        
        const submittingItemIndex = parrots.findIndex(parrot => parrot.id === submittingItemId);
        
        const submittingItemObj = {
            id: Math.floor(Math.random() * 10),
            title: titleValue,
            img: editImg,
            price: editPriceValue,
            birthDate: editDateValue,
            sizes:editWidthValue,
            sizes: editHeight,
            features: editFeaturesValue,
        }
        
        parrots.splice(submittingItemIndex, 1, submittingItemObj);
        elEditModal.hide();
        renderParrots();
    }
});

// Filterlash va Sortlash
elParrotsForm.addEventListener("submit", (evt) => {
    
    evt.preventDefault();
    
    const filterForm = evt.target.elements;
    
    const searchValue = filterForm.search_form.value;
    const searchPriceFromValue = +filterForm.price_from.value;
    const searchPriceToValue = +filterForm.price_to.value;
    // const searchSortValue = filterForm.sortby.value;
    
    const filterParrots = parrots.filter(function (element) {
        const isNameTitle = element.title.toLowerCase().includes(searchValue.toLowerCase());
        
        return isNameTitle
    })
    .filter(parrot => {
        const isPriceFrom = +parrot.price;
        
        return searchPriceFromValue <= isPriceFrom
    })
    .filter(parrot => {
        const isPriceFrom = +parrot.price;
        
        return !searchPriceToValue ? true : isPriceFrom <= searchPriceToValue
    })
    
    renderParrots(filterParrots)
    
});

