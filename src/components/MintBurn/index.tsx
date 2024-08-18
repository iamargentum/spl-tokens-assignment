export function MintBurn({}) {
    return (
        <div>
            <select value={''}>
                <option disabled value={''}>select account</option>
            </select>

            <input type="number" placeholder="enter amount" />

            <div>
                <button>mint</button>
                <button>burn</button>
            </div>
        </div>
    )
}