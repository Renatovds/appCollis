const maskInput = (text: string): string => {
  if (text.length <= 11) {
    const value = text.replace(/\D/g, '');
    const maskedText = value.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    );

    return maskedText;
  }

  const value = text.replace(/\D/g, '');
  const maskedText = value.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5',
  );
  return maskedText;
};
export default maskInput;
