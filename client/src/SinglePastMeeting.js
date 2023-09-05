const SingleCampaignPage = () => {
    const navigate = useNavigate();
    //const formattedDateTime = moment("2023-08-23T18:30:00Z").format('YYYY-MM-DDTHH:mm');
    const loginEmail = localStorage.getItem('loginEmail');
    const { meetingId } = useParams();
    const [meetingData, setMeetingData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        //const loginEmail = localStorage.getItem('loginEmail');
        console.log("loginEmail: ", loginEmail, "meedingId: ", meetingId)    
        const fetchMeetingData = async () => {
            try {
                const response = await fetch(`/pastmeeting/${meetingId}/${loginEmail}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch meeting details');
                }
    
                const meetingData = await response.json();
                setMeetingData(meetingData);
                console.log("meetingData: ", meetingData)
            } catch (error) {
                console.error('Error fetching meeting details:', error);
            }
        };
    
        fetchMeetingData();
    }, [meetingId]);