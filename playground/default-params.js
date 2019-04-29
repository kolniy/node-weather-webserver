// using default function
const greeter = (name = 'user') => {
    console.log('hello '+ name);
}

greeter()

// using default fnction with destructuring
const transaction = (type, { label, stock = 4, rating } = {}) => {
    console.log(type, label, stock, rating)
}

transaction('order', product)