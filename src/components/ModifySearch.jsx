import { useEffect, useState } from "react";
import styles from "../styles/ModifySearch.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const ModifySearch = () => {
    // State to manage the search parameters
    const location = useLocation();

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        from: "",
        to: "",
        date: "",
        travelClass: "",
        quota: "General",
    })

    // extract/get values from the URL params
    useEffect(() => {
        const query = new URLSearchParams(location.search);

        setSearchParams({
            from: query.get('from') || "",
            to:  query.get('to') || "",
            date: query.get('date') || "",
            travelClass: query.get('class') || "",
            quota: query.get('quota') || "General",
        })
    }, [location.search]);

    // handle modify search
    const handleSearch = (e) => {
        e.preventDefault();
        // basic validations
        if (!searchParams.to || !searchParams.from) {
            alert("Please endth both source and destination stations");
            return;
        }
        navigate(`/trainlist?from=${encodeURIComponent(searchParams.from)}&to=${encodeURIComponent(searchParams.to)}&date=${searchParams.date}&class=${encodeURIComponent(searchParams.travelClass)}&quota=${encodeURIComponent(searchParams.quota)}`);
    }


    return (
        <div className={styles.searchForm}>
            <h2>Modify Search</h2>
            <form>
                <input type="text" placeholder="From" value={searchParams.from} onChange={(e) => setSearchParams({...searchParams, from: e.target.value})} />
                <input type="text" placeholder="To" value={searchParams.to} onChange={(e) => setSearchParams({...searchParams, to: e.target.value})} />
                <input type="date" value={searchParams.date} onChange={(e) => setSearchParams({...searchParams, date: e.target.value})} />
                <select value={searchParams.travelClass} onChange={(e) => setSearchParams({...searchParams, travelClass: e.target.value})}>
                    <option value="">Select Class</option>
                    <option value="sleeper">Sleeper</option>
                    <option value="3AC">AC 3 Tier</option>
                    <option value="2AC">AC 2 Tier</option>
                    <option value="1AC">AC 1 Tier</option>
                </select>
                <select value={searchParams.quota} onChange={(e) => setSearchParams({...searchParams, quota: e.target.value})}>
                    <option value="">Select Quota</option>
                    <option value="general">General</option>
                    <option value="ladies">Ladies</option>
                    <option value="tatkal">Tatkal</option>
                </select>

                <button type="submit" onClick={handleSearch}>Search</button>
            </form>
        </div>
    );

}

export default ModifySearch;