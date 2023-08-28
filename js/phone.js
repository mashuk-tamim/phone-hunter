const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
    // searchField.value = '';
}

const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container');
    //display only 12 phones and show all
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl text-center pt-10`;
        phoneCard.innerHTML = `
        <figure><img class="p-10 bg-slate-50 rounded-lg" src="${phone.image}" alt="${phone.phone_name}" /></figure>
        <div class="card-body">
          <h2 class="text-3xl font-bold">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <p class="font-bold">$999</p>
          <div class="card-actions justify-center">
            <button id="show-details-btn" onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })
    toggleLoadingSpinner(false);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

//handle show details button
const handleShowDetails = async (id) => {
    console.log('clicked', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    showDetailsModal(phone);

}
//handle show all button
const handleShowAll = () => {
    handleSearch(true);
}

const showDetailsModal = (phone) => {
    //show details modal
    show_details_modal.showModal();

    console.log(phone);
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <img class="w-1/3 mx-auto bg-slate-50 rounded-lg" src="${phone.image}" alt="">
    <h3 class="text-3xl font-bold">${phone.name}</h3>
    <p><span class="font-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
    <p><span class="font-bold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
    <p><span class="font-bold">Chip set:</span> {phone.mainFeatures.chipSet}</p>
    <p><span class="font-bold">Memory:</span> ${phone.mainFeatures.memory}</p>
    <p><span class="font-bold">Slug:</span> ${phone.slug}</p>
    <p><span class="font-bold">Release Date:</span> ${phone.releaseDate}</p>
    <p><span class="font-bold">Brand:</span> ${phone.brand}</p>
    <p><span class="font-bold">GPS:</span> ${phone.others.GPS}</p>
    `
}

loadPhone();