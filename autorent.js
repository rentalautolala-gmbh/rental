  const cars = [
            {
                id: 1,
                name: "Golf 5 Plus",
                year: 2006,
                price: 20,
                category: "economic",
                featured: true,
                image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: {
                    seats: 5,
                    transmission: "Manual",
                    fuel: "Naftë",
                    bags: 2
                }
            },
            {
                id: 2,
                name: "Mercedes Class C",
                year: 2008,
                price: 30,
                category: "luxury",
                featured: true,
                image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: {
                    seats: 5,
                    transmission: "Automatik",
                    fuel: "Naftë",
                    bags: 3
                }
            },
            {
                id: 3,
                name: "VW Jetta",
                year: 2012,
                price: 30,
                category: "economic",
                featured: false,
                image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: {
                    seats: 5,
                    transmission: "Manual",
                    fuel: "Naftë",
                    bags: 2
                }
            },
            {
                id: 4,
                name: "Mercedes E Class",
                year: 2012,
                price: 40,
                category: "luxury",
                featured: true,
                image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: {
                    seats: 5,
                    transmission: "Automatik",
                    fuel: "Naftë",
                    bags: 4
                }
            },
            {
                id: 5,
                name: "Golf 6",
                year: 2011,
                price: 30,
                category: "economic",
                featured: false,
                image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: {
                    seats: 5,
                    transmission: "Manual",
                    fuel: "Naftë",
                    bags: 2
                }
            },
            {
                id: 6,
                name: "Audi Q5",
                year: 2010,
                price: 45,
                category: "suv",
                featured: true,
                image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: {
                    seats: 5,
                    transmission: "Automatik",
                    fuel: "Naftë",
                    bags: 4
                }
            }
        ];

        // DOM Elementet
        const carsContainer = document.getElementById('carsContainer');
        const carSelect = document.getElementById('carSelect');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mainMenu = document.getElementById('mainMenu');
        const bookingForm = document.getElementById('bookingForm');

        // Funksioni për të shfaqur makinat
        function displayCars(filter = 'all') {
            carsContainer.innerHTML = '';
            
            const filteredCars = filter === 'all' ? cars : 
                                filter === 'popular' ? cars.filter(car => car.featured) :
                                cars.filter(car => car.category === filter);
            
            filteredCars.forEach(car => {
                const carCard = document.createElement('div');
                carCard.className = `car-card ${car.featured ? 'featured' : ''}`;
                carCard.setAttribute('data-category', car.category);
                
                carCard.innerHTML = `
                    <div class="car-img" style="background-image: url('${car.image}')"></div>
                    <div class="car-info">
                        <div class="car-title">
                            <div>
                                <h3>${car.name}</h3>
                                <p>${car.category === 'economic' ? 'Ekonomike' : 
                                   car.category === 'suv' ? 'SUV' : 
                                   car.category === 'luxury' ? 'Luksoze' : ''}</p>
                            </div>
                            <div class="car-year">${car.year}</div>
                        </div>
                        
                        <div class="car-price">${car.price}€ <span>/ ditë</span></div>
                        
                        <div class="car-features">
                            <div class="car-feature">
                                <i class="fas fa-user-friends"></i>
                                <span>${car.features.seats} vende</span>
                            </div>
                            <div class="car-feature">
                                <i class="fas fa-cog"></i>
                                <span>${car.features.transmission}</span>
                            </div>
                            <div class="car-feature">
                                <i class="fas fa-gas-pump"></i>
                                <span>${car.features.fuel}</span>
                            </div>
                            <div class="car-feature">
                                <i class="fas fa-suitcase"></i>
                                <span>${car.features.bags} valixhe</span>
                            </div>
                        </div>
                        
                        <button class="btn" onclick="bookCar(${car.id})" style="width: 100%;">Rezervo Tani</button>
                    </div>
                `;
                
                carsContainer.appendChild(carCard);
            });
        }

        // Funksioni për të populluar dropdown për makinat
        function populateCarSelect() {
            carSelect.innerHTML = '<option value="">Zgjidhni një makinë</option>';
            cars.forEach(car => {
                const option = document.createElement('option');
                option.value = car.id;
                option.textContent = `${car.name} (${car.year}) - ${car.price}€/ditë`;
                carSelect.appendChild(option);
            });
        }

        // Funksioni për të rezervuar një makinë
        function bookCar(carId) {
            const car = cars.find(c => c.id === carId);
            if (car) {
                document.getElementById('carSelect').value = carId;
                document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Funksioni për të vendosur datat e sotme dhe nesërme
        function setDefaultDates() {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const todayFormatted = today.toISOString().split('T')[0];
            const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
            
            document.getElementById('pickupDate').value = todayFormatted;
            document.getElementById('pickupDate').min = todayFormatted;
            document.getElementById('returnDate').value = tomorrowFormatted;
            document.getElementById('returnDate').min = tomorrowFormatted;
        }

        // Event Listeners për filtrat
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Heq klasën active nga të gjitha butonat
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Shton klasën active tek butoni i klikuar
                this.classList.add('active');
                // Filtron makinat
                displayCars(this.getAttribute('data-filter'));
            });
        });

        // Mobile Menu Toggle
        mobileMenuBtn.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Mbyll menunë kur klikohet një link
        document.querySelectorAll('#mainMenu a').forEach(link => {
            link.addEventListener('click', () => {
                mainMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });

        // Form Submission
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const pickupDate = document.getElementById('pickupDate').value;
            const returnDate = document.getElementById('returnDate').value;
            const selectedCarId = document.getElementById('carSelect').value;
            const location = document.getElementById('location').value;
            
            const car = cars.find(c => c.id === parseInt(selectedCarId));
            
            if (!car) {
                alert('Ju lutem zgjidhni një makinë!');
                return;
            }
            
            // Kjo do të zëvendësohet me API call në versionin real
            alert(`Faleminderit për rezervimin, ${fullName}!\n\nRezervimi juaj për ${car.name} (${car.year}) është pranuar.\nData e marrjes: ${pickupDate}\nData e kthimit: ${returnDate}\nVendi: ${location}\n\nDo t'ju kontaktojmë në numrin ${phone} brenda 30 minutave për konfirmim.`);
            
            // Reset form
            bookingForm.reset();
            setDefaultDates();
        });

        // Update return date min when pickup date changes
        document.getElementById('pickupDate').addEventListener('change', function() {
            const returnDate = document.getElementById('returnDate');
            returnDate.min = this.value;
            
            if (returnDate.value < this.value) {
                returnDate.value = this.value;
            }
        });

        // Scroll efekti për header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            displayCars();
            populateCarSelect();
            setDefaultDates();
            
            // Smooth scrolling për të gjitha anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });
