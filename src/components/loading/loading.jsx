import { DotLoader } from "react-spinners";
import "./loading.scss";

const Loading = () => {
    return (
        <div className="loading-container">
            <DotLoader size={100} color="#07261E" />
        </div>
    );
};

export default Loading;
