import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import MainLayout from "./components/MainLayout";



function App() {

    return (
        <>
            <Toaster richColors />

            <BrowserRouter>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Homepage />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </MainLayout>
            </BrowserRouter>
        </>
    );
}

export default App;
