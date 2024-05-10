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
  
  class Wallet {
    #name;
    #cash;
    #dailyAllowance = 40; // Default daily allowance
    #dayTotalWithdrawals = 0; // Initial total withdrawals for the day
  
    constructor(name, cash) {
      this.#name = name;
      this.#cash = cash;
    }
  
    get name() {
      return this.#name;
    }
  
    deposit(amount) {
      this.#cash += amount;
    }
  
    withdraw(amount) {
      if (this.#cash - amount < 0) {
        console.log(`Insufficient funds!`);
        return 0;
      }
  
      // Check if the withdrawal amount exceeds the daily allowance
      if (amount + this.#dayTotalWithdrawals > this.#dailyAllowance) {
        console.log(`Insufficient remaining daily allowance!`);
        return 0;
      }
  
  
      this.#cash -= amount;
      this.#dayTotalWithdrawals += amount;
      return amount;
    }
  
    transferInto(wallet, amount) {
      console.log(
        `Transferring ${eurosFormatter.format(amount)} from ${this.name} to ${
          wallet.name
        }`
      );
      const withdrawnAmount = this.withdraw(amount);
      wallet.deposit(withdrawnAmount);
    }
  
    reportBalance() {
      console.log(
        `Name: ${this.name}, balance: ${eurosFormatter.format(
          this.#cash
        )}, daily allowance: ${eurosFormatter.format(
          this.#dailyAllowance
        )}, withdrawals today: ${eurosFormatter.format(this.#dayTotalWithdrawals)}`
      );
    }
  
    resetDailyAllowance() {
      this.#dayTotalWithdrawals = 0;
    }
  
    setDailyAllowance(newAllowance) {
      this.#dailyAllowance = newAllowance;
    }
  
  };
  
  function main() {
    const walletJack = new Wallet('Jack', 100);
    const walletJoe = new Wallet('Joe', 10);
    const walletJane = new Wallet('Jane', 20);
  
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