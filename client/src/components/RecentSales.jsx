function RecentSales({ sales = [] }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-5">
        Recent Sales
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-5 text-gray-500"
                >
                  No Recent Sales
                </td>
              </tr>
            ) : (
              sales.map((sale, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{sale.invoiceNumber}</td>

                  <td className="p-3">{sale.customerName}</td>

                  <td className="p-3">
                    ₹{sale.amount.toLocaleString()}
                  </td>

                  <td className="p-3">{sale.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentSales;