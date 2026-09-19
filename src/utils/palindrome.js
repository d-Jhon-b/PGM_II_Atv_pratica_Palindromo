/**
 *  @param {string[]} listaPalavra
 *  @returns {{resultaod:boolean,msg:string lista:string[]}}
 */
function compararPalavra(listaPalavra){
      let resultaod = false
      for(let i =0; i<listaPalavra.length/2; i++){
          if(listaPalavra[i] !== listaPalavra[listaPalavra.length-1-i]){return {resultaod: false, msg:"Não é uma palavra palindroma",lista:listaPalavra}}
          continue
      }
      return {resultaod: true, msg: "É uma palavra polindroma", lista: listaPalavra}

}




/**
 * @param {string} palavra
 * @returns {string[]}
 */
function normalizarPalavra(palavra){
      let limpo = palavra.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g,"")
      .toLowerCase()  
      const listaDeLetras = limpo.split('');
      return listaDeLetras
}

/**
 *  @param {string} palavra
 *  @returns {{resultaod:boolean,msg:string lista:string[]}} 
 */
const definirSeEPalindroma=async(palavra)=>{
    try{
      const palavraNormalizada = await normalizarPalavra(palavra);
      const resultado = await compararPalavra(palavraNormalizada);
      return resultado
    }catch(err){
      throw new Error("Erro ao processsar a palavra" + err.message)
    }
}

export default definirSeEPalindroma


