const MonthDropDown = ({ selectedMonth, onChange }) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <>
            <select value={selectedMonth} onChange={(e) => onChange(e.target.value)} className=" bg-orange-500 p-2">
                {
                    months.map(month => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))
                }
            </select>

        </>
    )
}

export default MonthDropDown