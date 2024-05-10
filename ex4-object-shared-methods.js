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
  
  function deposit(amount) {
    // add
    if (this._dayTotalWithdrawals + amount > this._dailyAllowance) {
      console.log(`Daily withdrawal limit exceeded!`);
      return 0;
    }
    // --
    this._cash += amount;
  }
  
  function withdraw(amount) {
    if (this._cash - amount < 0) {
      console.log(`Insufficient funds!`);
      return 0;
    }
  
    // add
    if (this._dayTotalWithdrawals + amount > this._dailyAllowance) {
      console.log(`Daily withdrawal limit exceeded! Allowed: ${this._dailyAllowance}, Attempted: ${amount}`);
      return 0;
    }
    // --
  
    this._cash -= amount;
    this._dayTotalWithdrawals += amount;
    return amount;
  }
  
  function transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${
        this._name
      } to ${wallet.getName()}`
    );
    const withdrawnAmount = this.withdraw(amount);
    if (withdrawnAmount > 0) {
    wallet.deposit(withdrawnAmount);
    }
  }
  // add
  function resetDailyAllowance() {
    this._dayTotalWithdrawals = 0;
  }
  
  function setDailyAllowance(newAllowance) {
    this._dailyAllowance = newAllowance;
  }
  // --
  
  function reportBalance() {
    console.log(
      `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
    );
  }
  
  function getName() {
    return this._name;
  }
  
  function createWallet(name, cash = 0) {
    return {
      _name: name,
      _cash: cash,
      _dailyAllowance: 40,
      _dayTotalWithdrawals: 0,
      deposit,
      withdraw,
      transferInto,
      reportBalance,
      getName,
      resetDailyAllowance,
      setDailyAllowance
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
  
    // add
    walletJack.setDailyAllowance(80);
    walletJack.transferInto(walletJoe, 50);
    // --
  
    walletJack.reportBalance();
    walletJoe.reportBalance();
    walletJane.reportBalance();
  
    // add
    walletJack.resetDailyAllowance();
    walletJoe.resetDailyAllowance();
    walletJane.resetDailyAllowance();
    // --
  }
  
  main();