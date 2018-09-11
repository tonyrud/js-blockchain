class DrivingRecordSmartContract {
  apply(transaction, blocks) {
    //go through all blocks
    blocks.forEach(block => {
      block.transactions.forEach(trans => {
        if (transaction.driverLicenseNumber === trans.driverLicenseNumber) {
          transaction.noOfViolations++

          if (transaction.noOfViolations > 5) {
            transaction.isDriversLicenseSuspended = true
          }
        }
      })
    })
  }
}

module.exports = DrivingRecordSmartContract
