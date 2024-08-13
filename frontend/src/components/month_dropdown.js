const MonthDropDown = ({ selectedMonth, onChange }) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <>
           <div className="">
           <select value={selectedMonth} onChange={(e) => onChange(e.target.value)} className=" bg-orange-400 p-2 rounded-md -ml-36 text-white font-bold">
                {
                    months.map(month => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))
                }
            </select>
           </div>

        </>
    )
}

export default MonthDropDown