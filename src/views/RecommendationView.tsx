function RecommendationsView(props: {recommendations: string[];}) {
    function recommendationACB(recommendation: any) {
        return <li>{recommendation.name}</li>;
    }
    return (
        <ul>
            {props.recommendations?.map(recommendationACB)}
        </ul>        
        );
}

export default RecommendationsView;