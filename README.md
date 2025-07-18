# 🚗 Vehicle Listing App – Take-Home Assignment

A fully responsive vehicle browsing platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**, with unit tests using **Jest** and **React Testing Library**.

---

## 📦 Tech Stack

* **Framework**: Next.js (Pages Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Testing**: Jest + React Testing Library
* **Utilities**: ESLint, Prettier

---

## ⚙️ Project Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/vehicle-listing-app.git
cd vehicle-listing-app
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

---

## 🧪 Running Tests

### 1. Run All Tests

```bash
npm test
# or
yarn test
```

### 2. Check Code Coverage

```bash
npm run test:coverage
# or
yarn test:coverage
```

After running, open the following file in your browser to view the coverage report:

```bash
./coverage/lcov-report/index.html
```

---

## 🚀 Run the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Project Structure

```
.
├── components/ # component with its test file (Component.test.tsx)
│   ├── Header/             
│   ├── Sort/
│   ├── VehicleCard/
│   ├── VehiclesList/
│   ├── ZipHeader/
│   └── ZipModal/
├── pages/
│   ├── index.tsx           # Entry point containing Header and VehiclesList
├── public/
│   └── flexcar_icon.png
├── types/
│   └── vehicle.ts
├── styles/
├── coverage/               # (after running test:coverage)
├── README.md
└── package.json
```

---

## 🎯 Features

* Modal input for entering ZIP code before displaying vehicles
* Vehicle cards displaying image and details
* Filtering by vehicle **make** and **color**
* Sorting by **price** (low-to-high, high-to-low) and **year**
* **100% test coverage** for core components
* Tailwind-based **responsive design**

**Note**: Currently, you can only search for two ZIP codes.

---

## 🧠 Design Decisions & Assumptions

* Vehicle data is **static** and filtered **client-side**
* ZIP modal enforces location input **before** rendering listings
* Filtering and sorting are performed **in-memory** (no backend calls)
* All props are **strongly typed** via TypeScript interfaces
* Component **unit tests** ensure reliability and full coverage
* `data-testid` attributes are used for RTL selectors

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)

---

## 👤 Author

**Radhika**
[RadhikaTech](https://github.com/RadhikaTech))

---
