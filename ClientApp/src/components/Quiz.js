/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api'
import useStateContext from '../hooks/useStateContext'
import { Card, CardContent, CardMedia, CardHeader, List, ListItemButton, Typography, Box, LinearProgress } from '@mui/material'
import { getFormatedTime } from '../helper'
import { useNavigate } from 'react-router'
import { Button } from '@mui/material'
//import { Timer } from '@mui/icons-material'


export default function Quiz() {

    const [qns, setQns] = useState([])
    const [qnIndex, setQnIndex] = useState(0)
    const [timeTaken, setTimeTaken] = useState(0)
    const { context, setContext } = useStateContext()
    const navigate = useNavigate()
    const [lastQuestionReached, setLastQuestionReached] = useState(false);

    let timer;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const startTimer = () => {
        timer = setInterval(() => {
            setTimeTaken(prev => prev + 1)
        }, [1000])
    }

    useEffect(() => {
        setContext({
            timeTaken: 0,
            selectedOptions: []
        })
        createAPIEndpoint(ENDPOINTS.question)
            .fetch() 
            .then(res => {
                setQns(res.data)
                startTimer()
            })
            .catch(err => { console.log(err); })

        return () => { clearInterval(timer) }
    }, [])

    const updateAnswer = (questionId, optionIdx) => {
  const temp = [...context.selectedOptions];
  temp[qnIndex] = {
    questionId,
    selected: optionIdx,
  };

  setContext({ ...context, selectedOptions: temp });

  if (qnIndex < 9) {
    setQnIndex(qnIndex + 1); // Navigate to the next question
  } else {
    setContext({ ...context, selectedOptions: temp, timeTaken });
    setLastQuestionReached(true); // Quiz is complete
  }
};

    return (
        qns.length !== 0
            ? <Card
                sx={{
                    maxWidth: 640, mx: 'auto', mt: 5,
                    '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' }
                }}>
                <CardHeader
                    title={'Question ' + (qnIndex + 1) + ' of 10'}
                    action={<Typography>{getFormatedTime(timeTaken)}</Typography>} />
                <Box>
                    <LinearProgress variant="determinate" value={(qnIndex + 1) * 100 / 10} />
                </Box>
                {qns[qnIndex].imageName != null
                    ? <CardMedia
                        component="img"
                        image={BASE_URL + 'images/' + qns[qnIndex].imageName}
                        sx={{ width: 'auto', m: '10px auto' }} />
                    : null}
                <CardContent>
                    <Typography variant="h6">
                        {qns[qnIndex].qnInWords}
                    </Typography>
                        <List>
                            {qns[qnIndex].options.map((item, idx) =>
                                <ListItemButton disableRipple key={idx} onClick={() => updateAnswer(qns[qnIndex].qnId, idx)}>
                                    <div>
                                        <b>{String.fromCharCode(65 + idx) + " . "}</b>{item}
                                    </div>

                                </ListItemButton>
                            )}
                        </List>
                   {qnIndex > 0 && (
            <Button onClick={() => setQnIndex(qnIndex - 1)}>
              Previous
            </Button>
          )}
          {(qnIndex === 9 || lastQuestionReached) && (
            <Button onClick={() => navigate('/result')}>
              Submit
            </Button>
              )}      
                </CardContent>
                                
            </Card>
            : null
    )
}