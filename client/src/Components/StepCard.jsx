const StepCard = ({cardId, cardTitle}) => {
    return(
        <div className="step-card">
            <h2 className="step-card__id">0{cardId}</h2>
            <div className="step-card__title">{cardTitle}</div>
        </div>
    )
};

export default StepCard;