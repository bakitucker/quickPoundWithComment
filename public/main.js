



      document.querySelector('.searchWorkout').addEventListener('click', function(){
       let workoutValue = document.querySelector('.workOutValue').value
        fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${workoutValue}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': 'z+kP/dQ1FLHyJ/EwaC6oBg==0NTw6jxccdMQUNgj',
            'Content-Type': 'application/json'
          },
      
        })
        .then(res => res.json()) // parse response as JSON 
    .then(data => { 
      console.log(data) 
 
    }) 
    .catch(err => { 
        console.log(`error ${err}`) 
    });
  });










