// import {makeStyles} from "@mui/styles";
// import {
//     Card,
//     CardActionArea,
//     CardContent,
//     CardMedia,
//     Collapse,
//     createTheme,
//     ThemeProvider,
//     Typography
// } from "@mui/material";
// import {Link} from "react-router-dom";
//
//
// const theme = createTheme({
//     typography: {
//         fontFamily: 'Nunito',
//     }
// })
//
//
// const useStyles = makeStyles({
//     root: {
//         maxWidth: 645,
//         background: 'rgba(0,0,0,0.52)',
//         margin: '70px'
//     },
//     media: {
//         height: 340,
//         opacity: 0.6
//     },
//     title: {
//         color: '#DDA0DD',
//         fontWeight: 600,
//         fontSize: '1.7rem',
//     }
//
// });
//
// export default function ImageCard({action, checked}) {
//     const classes = useStyles();
//
//     return (
//         <Card className={classes.root}>
//             <CardMedia
//                 className={classes.media}
//                 image={action.imageUrl}
//             />
//             <CardContent>
//                 <Link to={{pathname: action.url}}>
//                     <ThemeProvider theme={theme}>
//                         <Typography
//                             className={classes.title}
//                             gutterBottom
//                             variant="h5"
//                             component="h1"
//                         >
//                             {action.title}
//                         </Typography>
//                     </ThemeProvider>
//                 </Link>
//             </CardContent>
//         </Card>
//
//     );
// }