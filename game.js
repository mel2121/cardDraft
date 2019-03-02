class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playerCard1: null,
      playerCard2: null,
      playerCard3: null,
      playerTotal: null,
      bankCard1: null,
      bankCard2: null,
      bankCard3: null,
      bankCard3:null,
      bankTotal: null,
      winner: null,
      bet:0,
      stillPlaying: true
      
    }
   this.firstDraw=this.firstDraw.bind(this);
   
    this.whoWon=this.whoWon.bind(this);
    this.thirdCardPlayerDraw=this.thirdCardPlayerDraw.bind(this);
    this.thirdCardBankDraw=this.thirdCardBankDraw.bind(this);
  }
whoWon=()=>{
  this.setState(prevState => {
       return {winner: "you" }
    })
}
  
  firstDraw=()=>{
    
    this.setState(prevState => {
       return {playerCard1: (Math.floor(Math.random() * 10)+1),
     playerCard2: (Math.floor(Math.random() * 10)+1),  
               bankCard1: (Math.floor(Math.random() * 10)+1),  
               bankCard2: (Math.floor(Math.random() * 10)+1), 
               playerCard3: (Math.floor(Math.random() * 10)+1),
               bankCard3: (Math.floor(Math.random() * 10)+1),
              // winner: "no one"
              }
    })
    
  }
  thirdCardPlayerDraw =() => {
    this.setState(prevState => {
       return {playerCard3: (Math.floor(Math.random() * 10)+1),
                   }
    })
  }
  thirdCardBankDraw =() => {
    this.setState(prevState => {
       return {bankCard3: (Math.floor(Math.random() * 10)+1),
                   }
    })
  }
  
  
  render () {
    
    const pbackground=this.state.stillPlaying?"yep":"nope";
  
    const roundItB = evenItOut(this.state.bankCard2,this.state.bankCard1);
    
    const testThird = bankDrawThird(this.state.bankCard2,this.state.bankCard1, this.state.playerCard3);
    const testPlayerThird=PlayerDrawThird(this.state.playerCard2,this.state.playerCard1);
   // const testPlayerThird=PlayerDrawThird(2,2);
      const roundItP = evenItOut(this.state.playerCard2,this.state.playerCard1);
  const winnerN=CheckNatural(this.state.playerCard2,this.state.playerCard1,this.state.bankCard2,this.state.bankCard1);
    const drawWasMade=this.state.bankCard1;
    const bSub1=this.state.bankCard1;
    const bSub2=this.state.bankCard2;
    const bSub3=this.state.bankCard3;
    const pSub1=this.state.playerCard1;
    const pSub2=this.state.playerCard2;
    const pSub3=this.state.playerCard3;
    //const winnerPB=DetermineWinner(this.state.playerCard3,this.state.playerCard3,this.state.bankCard3,this.state.bankCard3);
    const winnerPB=DetermineWinner(roundItP,pSub3,roundItB,bSub3);
    const winnerP=DetermineWinner(roundItP,pSub3,bSub2,bSub1);
     const winnerB=DetermineWinner(pSub2,pSub1,roundItB,bSub3);
    const winnerS=DetermineWinner(pSub1,pSub2,bSub2,bSub1);
   // const winnerB=DetermineWinner(this.state.playerCard1,this.state.playerCard2,roundItUpB,this.state.bankCard3); 
  let winnerStatus;
  if(winnerN){
    winnerStatus=winnerN;
  } else if ((testPlayerThird)&&(testThird)) {
   winnerStatus=winnerPB;
   // winnerStatus="player and bank to draw";
  }  else if (testPlayerThird) {
    winnerStatus=winnerP;
    //  winnerStatus="player to draw";
  }
    else if (testThird) {
    winnerStatus=winnerB;
    //  winnerStatus="bank to draw";
  }
    else if (drawWasMade) {
    winnerStatus=winnerS;
      //winnerStatus="both stand";
  }
   else {
    winnerStatus=null;
  }  
    
    return (
  <div>
    <h1>Welcome to the game</h1>
        <br />
        <span>Player</span>
        <br />
        <div className="cardType">
        <div>Card 1: {this.state.playerCard1}</div>
          <span>{this.state.playerCard1}</span>
           </div>
        <br />
        <span>Card 2: {this.state.playerCard2}</span>
        <br />
       
        <span>Subtotal: {roundItP}</span>
        <br />
        <br />
        <span>Card 3: {this.state.playerCard3}</span>
        <br />
        <span>Show player card?: {testPlayerThird}</span>
        <br /> 
        
        <br />
                <span>Bank</span>
         <br />
        <span>Card 1: {this.state.bankCard1}</span>
        <br />
        <span>Card 2: {this.state.bankCard2}</span>
        <br />
        
        <span>Card 3: {this.state.bankCard3}</span>
        <br />
        <br />
        
        <span>Show bank card?: {testThird}</span>
        <br />
        <span>Subtotal: {roundItB}</span>
        <br />
        <button onClick={this.firstDraw}>draw</button>
        <br />
        <button onClick={this.thirdCardPlayerDraw}>3rd Player draw</button>
        <br />
        <button onClick={this.thirdCardBankDraw}>3rd Bank draw</button>
        <br />
        <span> Winner:{winnerStatus} </span>
        <br />
        <span>Your bet: ${this.state.bet}</span>
        <br />
        <button>Up the bet by 5</button>
        <br />
        <button>Lower the bet by 5</button>
  </div>
  );
  }
}
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function DetermineWinner(PC1,PC2,BC1,BC2){
  if(PC1==null){
    return null;
  }
  amt1=evenItOut(PC1,PC2);
  amt2=evenItOut(BC1,BC2);
  if ((9-amt1)<(9-amt2)) {
    return "player wins!";
     }   
  else if ((amt1==amt2)) {
       return "tie";
     } 
  else {
       return "banks wins";
     }
}

function evenItOut(c1,c2) {
  if(c1==null){return null;}
  var amt = c1+c2;
  if(amt>19) {return (amt-20)}
  else if (amt>9) {return (amt-10)}
  else {return amt}
}

function instantWin2(amt1,amt2){
  if ((9-amt1)<(9-amt2)) {
    return "player wins!";
     } else if((amt1==null)||(amt2==null)){
       return null;
     }
  
  else if ((amt1==amt2)) {
       return "tie";
     } else if ((amt1>amt2)) {
       return "banks wins";
     }
  else {
       return null;
     }
}

checkStats = (amt1,amt2) =>{
  if ((amt1>-1)||(amt2>-1)) {
    return "something works"
  }
  else {
    return "bob";
  }
    
  
} 
function checkForTotal(amt) {
  if(amt > 3){
    return "not bad";
  } else if (amt!==null){
    return "been drawn"
  }
  else {
    return null;
  }
}
function bankDrawThird(BC1,BC2,PC3){
  
  if(BC1==null){return false;}
  
  var BankTotal = evenItOut(BC1,BC2);
  if (BankTotal<3){
    return "draw";
  } 
  else if ((BankTotal==3)&&(PC3 !=8)) {
    return "draw";
  }
  else if((BankTotal==4)&&(PC3>1)&&(PC3<8)){
    return "draw";
  }
  else if((BankTotal==5)&&(PC3>3)&&(PC3<8)) {
    return "draw";
  }
  else if ((BankTotal==6)&&(PC3>5)&&(PC3<8)) {
  return "draw";
  } else {
    return null;
  }
}

function PlayerDrawThird(PC1,PC2){
  if (PC1==null){
    return null;
}
  
  var playerTotal = evenItOut(PC1,PC2);
  if(playerTotal<6){return "draw";}
  else {
    return null;
  }
  
}
function CheckNatural(PC1,PC2,BC1,BC2){
  
  if(PC1==null){
    return null;
  }
  var PT = evenItOut(PC1,PC2);
  var BT=evenItOut(BC1,BC2);
  if(((PT==9)||(PT==8))&&((BT==9)||(BT==8))){
    return "natural tie";
  }
  else if((PT==8)||(PT==9)){
    return "natural player";
  }
  else if((BT==9)||(BT==8)){
    return "natural bank"
  }
  else{
    return null;
  }
}
