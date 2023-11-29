import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const footer = () => {
  return (
    <Paper sx={{marginTop: 'calc(3% + 20px)', bottom: 0,width: '100%'}} component="footer" square variant="outlined">
    <Container maxWidth="lg">
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          my:1
        }}
      >
        
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          mb:1,
        }}
      >
        <Typography variant="caption" color="initial">
          Copyright ©2024. [] Limited
        </Typography>
      </Box>
    </Container>
  </Paper>
  )
}

export default footer