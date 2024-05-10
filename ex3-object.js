// Add two data values to the wallet:

// A variable/property dailyAllowance indicating the maximum amount that can be withdrawn per day. Set the default value to 40.
// A variable/property dayTotalWithdrawals that holds the total amount withdrawn during the day, initially zero.
// Add a method resetDailyAllowance(). It should reset dayTotalWithdrawals to zero. Assume that the issuer of the wallet (e.g. a bank) will call this function at the start of a new day.

// Add a method setDailyAllowance(newAllowance) to set/update the maximum daily allowance (dailyAllowance). Assume that the issuer of the wallet (e.g., a bank) will call this function after approving a request from the wallet owner to update the daily allowance.

// Update the other methods as required to support the new functionality.


const eurosFormatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  });
  
  
  
  function createWallet(name, cash = 0) {
    let dailyAllowance = 40; // Default daily allowance
    let dayTotalWithdrawals = 0; // Initial total withdrawals for the day
    
    return {
      _name: name,
      _cash: cash,
  
      deposit: function (amount) {
        this._cash += amount;
      },
  
      withdraw: function (amount) {
  
        if (dayTotalWithdrawals + amount > dailyAllowance) {
          console.log(`Insufficient remaining daily allowance!`);   //Add it
          return 0;
        }
  
        if (this._cash - amount < 0) {
          console.log(`Insufficient funds!`);
          return 0;
        }
  
        this._cash -= amount;
        return amount;
      },
  
      transferInto: function (wallet, amount) {
        console.log(
          `Transferring ${eurosFormatter.format(amount)} from ${
            this._name
          } to ${wallet.getName()}`
        );
        const withdrawnAmount = this.withdraw(amount);
        wallet.deposit(withdrawnAmount);
      },
  
      reportBalance: function () {
        console.log(
          `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
        );
      },
  
      getName: function () {
        return this._name;
      },
  
  
      resetDailyAllowance: function () {      
        dayTotalWithdrawals = 0;            //Add
      },
  
      setDailyAllowance: function (newAllowance) {
        dailyAllowance = newAllowance;       //ADD it
      },
      
    };
  }
  
  function main() {
    const walletJack = createWallet('Jack', 100);
    const walletJoe = createWallet('Joe', 10);
    const walletJane = createWallet('Jane', 20);
  
    walletJack.transferInto(walletJoe, 50);
    walletJane.transferInto(walletJoe, 25);
  
    walletJane.deposit(20);
    walletJane.transferInto(walletJoe, 25);
  
    walletJack.reportBalance();
    walletJoe.reportBalance();
    walletJane.reportBalance();
  
  
    // Test the new functionality
    walletJack.setDailyAllowance(60);
    walletJack.withdraw(50); // Should succeed
    walletJack.withdraw(20); // Should fail due to exceeding daily allowance
    walletJack.reportBalance();
  
    // Reset daily allowance for the next day
    walletJack.resetDailyAllowance();
    walletJack.withdraw(50); // Should succeed after resetting daily allowance
    walletJack.reportBalance();
  }
  
  main();