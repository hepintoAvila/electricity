function convertirACifraDecimal(numero) {
  const cifraDecimal = numero.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return cifraDecimal;
}
function multiplicar(a,b){
  return a*b
}
export { convertirACifraDecimal,multiplicar};
