type CheckoutFormData = {
    name: string;
    email: string;
    address: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
};

export function validateCheckoutForm(formData: CheckoutFormData): string | null {
    const {
        name,
        email,
        address,
        cardNumber,
        expirationDate,
        cvv,
    } = formData;

    const hasEmptyFields =
        name.trim() === "" ||
        email.trim() === "" ||
        address.trim() === "" ||
        cardNumber.trim() === "" ||
        expirationDate.trim() === "" ||
        cvv.trim() === "";

    if (hasEmptyFields) {
        return "Completa todos los campos.";
    }

    if (!email.includes("@")) {
        return "Escribe un correo válido.";
    }

    if (!/^\d{16}$/.test(cardNumber)) {
        return "El número de tarjeta debe tener 16 dígitos.";
    }

    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
        return "Escribe la fecha de vencimiento en formato MM/AA.";
    }

    const expirationMonth = Number(expirationDate.slice(0, 2));
    const expirationYear = Number("20" + expirationDate.slice(3, 5));

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const isExpired =
        expirationYear < currentYear ||
        (expirationYear === currentYear &&
            expirationMonth < currentMonth);

    if (
        expirationMonth < 1 ||
        expirationMonth > 12 ||
        isExpired
    ) {
        return "La fecha de vencimiento no es válida.";
    }

    if (!/^\d{3}$/.test(cvv)) {
        return "El CVV debe tener 3 dígitos.";
    }

    return null;
}