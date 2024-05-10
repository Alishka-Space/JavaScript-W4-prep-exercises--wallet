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
  
  function Wallet(name, cash) {
    this._name = name;
    this._cash = cash;
    this._dailyAllowance = 40; // New property
    this._dayTotalWithdrawals = 0; // New property
  }
  
  Wallet.prototype.deposit = function (amount) {
    this._cash += amount;
  };
  
  Wallet.prototype.withdraw = function (amount) {
  
    // Check if the requested withdrawal amount exceeds the remaining daily allowance
    if (amount > this._dailyAllowance - this._dayTotalWithdrawals) {
      console.log(`Withdrawal exceeds daily allowance!`);
      return 0;
    }
  
  
    if (this._cash - amount < 0) {
      console.log(`Insufficient funds!`);
      return 0;
    }
  
    this._cash -= amount;
    dayTotalWithdrawals += amount;  // Update the daily withdrawals
    return amount;
  };
  
  Wallet.prototype.transferInto = function (wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${
        this._name
      } to ${wallet.getName()}`
    );
    const withdrawnAmount = this.withdraw(amount);
    wallet.deposit(withdrawnAmount);
  };
  
  Wallet.prototype.reportBalance = function () {
    console.log(
      `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
    );
  };
  
  Wallet.prototype.getName = function () {
    return this._name;
  };
  
  // New method to reset the daily allowance
  Wallet.prototype.resetDailyAllowance = function () {
    this._dayTotalWithdrawals = 0;
  };
  
  // New method to set the daily allowance
  Wallet.prototype.setDailyAllowance = function (newAllowance) {
    this._dailyAllowance = newAllowance;
  };
  
  function main() {
    const walletJack = new Wallet('Jack', 100);
    const walletJoe = new Wallet('Joe', 10);
    const walletJane = new Wallet('Jane', 20);
  
      // Set a new daily allowance for Jack's wallet
      walletJack.setDailyAllowance(60);
  
      walletJack.withdraw(70); // exceeds daily allowance!"
      // Withdraw within the daily allowance
      walletJack.withdraw(50);
      walletJack.resetDailyAllowance();
    walletJack.transferInto(walletJoe, 50);
    walletJane.transferInto(walletJoe, 25);
  
    walletJane.deposit(20);
    walletJane.transferInto(walletJoe, 25);
  
    walletJack.reportBalance();
    walletJoe.reportBalance();
    walletJane.reportBalance();
  }
  
  main();