if(dadosCriarTabelaT1.length < totalCadaTime){

    if(dadosCriarTabelaT2.length < totalCadaTime){
      if(random % 2 === 0) {
        //time 02
        console.log("2")
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE user_partida SET time=? WHERE id=?",
            [2, idtimedele],
            (tx, result) => {
              if (result.rowsAffected > 0) {
                console.log('ok')
                setIdTimedele('');
                settimedele('');
                setDadosCriarTabela([]);
                setatt(!att)
              } else {
                alert('erro 03!')
              }
            }
          );
        });
      }else{
        //time 01
        console.log("1")
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE user_partida SET time=? WHERE  id=?",
            [1, idtimedele],
            (tx, result) => {
              if (result.rowsAffected > 0) {
                console.log('ok')
                setIdTimedele('');
                settimedele('');
                setDadosCriarTabela([]);
                setatt(!att)
              } else {
                alert(idtimedele)
              }
            }
          );
        });
      }
    }

  }else{
    if(dadosCriarTabelaT2.length < totalCadaTime){
      
        //time 02
        console.log("2")
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE user_partida SET time=? WHERE id=?",
            [2, idtimedele],
            (tx, result) => {
              if (result.rowsAffected > 0) {
                console.log('ok')
                setIdTimedele('');
                settimedele('');
                setDadosCriarTabela([]);
                setatt(!att)
              } else {
                alert('erro 01')
              }
            }
          );
        });
      
  }