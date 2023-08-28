const handleSearch2 = () => {
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone2(searchText);
    searchField.value = '';
}

const loadPhone2 = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log('loading');
    displayPhones2(phones);
}

const displayPhones2 = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl text-center pt-10`
        phoneCard.innerHTML = `
        <figure><img class="p-10 bg-slate-50 rounded-lg" src="${phone.image}" alt="${phone.phone_name}" /></figure>
        <div class="card-body">
          <h2 class="text-3xl font-bold">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <p class="font-bold">$999</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })
}

{/* <div class="card w-96 bg-base-100 shadow-xl">
  <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div> */}