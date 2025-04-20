import { Box, Typography } from "@mui/material"
import CustomCarousel from "../../components/CustomCarousel"

const Home = () => {
    const urls = [
        "./images/Coffee 1.jpg",
        "./images/Coffee 2.webp",
        "./images/Coffee 3.jpg",
        "./images/Coffee 3.webp",
        "./images/Coffee 4.webp",
        "./images/Coffee 4.jpg",
        "./images/Coffee 5.webp",
        "./images/Coffee 6.webp",
        "./images/Coffee 7.webp",
        "./images/Coffee 8.webp",
    ];
    return (
        <>
            <Box sx={{ pt: 2 }}>
                <CustomCarousel data={urls} />
            </Box>
            <Box sx={{ py: 6, px: { md: 12, xs: 2 } }}>
                <Box display={"flex"} justifyContent={"center"}>
                    <Typography variant="h3">About Us</Typography>
                </Box>
                <Box sx={{ background: "#f1cfc3" }}>
                    <Box display={"flex"} justifyContent={"center"} p={2}>
                        <Typography variant="h5" align="center">Welcome,To Letmegrab</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" px={{ xs: 2, sm: 4, md: 8, lg: 12 }}>
                        <Box component="img"
                            src="https://cdni.iconscout.com/illustration/premium/thumb/growing-business-by-digital-marketing-4217800-3501667.png"
                            alt="Digital Marketing Illustration"
                            sx={{
                                width: '100%',
                                maxWidth: '600px',
                                height: 'auto',
                            }}
                        />
                    </Box>

                    <Box px={{ lg: 20, md: 16, sm: 6, xs: 2 }} pb={2}>
                        <Typography sx={{ fontFamily: "cursive", fontSize: "24px" }}>
                            " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. "
                        </Typography>
                    </Box>

                </Box>
            </Box>
        </>
    )
}

export default Home