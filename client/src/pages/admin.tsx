import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import Logo from "@/components/logo";

interface Photo {
  id: string;
  url: string;
  description: string | null;
  createdAt: Date | null;
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoDescription, setPhotoDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      return response.json();
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo à área administrativa.",
      });
    },
    onError: () => {
      toast({
        title: "Erro no login",
        description: "Credenciais inválidas.",
        variant: "destructive",
      });
    },
  });

  const { data: photos, isLoading } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
    enabled: isLoggedIn,
  });

  const addPhotoMutation = useMutation({
    mutationFn: async (photoData: { url: string; description: string }) => {
      const response = await apiRequest("POST", "/api/photos", photoData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
      setPhotoFile(null);
      setPhotoDescription("");
      toast({
        title: "Foto adicionada",
        description: "A foto foi adicionada com sucesso à galeria.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao adicionar a foto.",
        variant: "destructive",
      });
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: async (photoId: string) => {
      const response = await apiRequest("DELETE", `/api/photos/${photoId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
      toast({
        title: "Foto excluída",
        description: "A foto foi removida da galeria.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao excluir a foto.",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFile) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      addPhotoMutation.mutate({
        url: dataUrl,
        description: photoDescription,
      });
    };
    reader.readAsDataURL(photoFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erro",
          description: "Por favor, selecione apenas arquivos de imagem.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erro",
          description: "O arquivo deve ter no máximo 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setPhotoFile(file);
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    if (confirm("Tem certeza que deseja excluir esta foto?")) {
      deletePhotoMutation.mutate(photoId);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-between items-center mb-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Voltar
                </Button>
              </Link>
              <Logo />
              <div className="w-16"></div> {/* Spacer for centering */}
            </div>
            <CardTitle className="text-2xl">Área Administrativa</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[hsl(215,89%,54%)] hover:bg-[hsl(215,89%,48%)]"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Logo />
            <h1 className="text-3xl font-bold text-[hsl(220,26%,14%)]">
              Área Administrativa
            </h1>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Sair
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Add Photo Section */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Nova Foto</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <Label htmlFor="photoFile">Arquivo da Foto</Label>
                  <Input
                    id="photoFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold h-auto file:bg-[hsl(215,89%,54%)] file:text-white hover:file:bg-[hsl(215,89%,48%)]"
                  />
                  {photoFile && (
                    <p className="text-sm text-gray-600 mt-2">
                      Arquivo selecionado: {photoFile.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="photoDescription">Descrição</Label>
                  <Input
                    id="photoDescription"
                    type="text"
                    value={photoDescription}
                    onChange={(e) => setPhotoDescription(e.target.value)}
                    placeholder="Descrição da foto"
                  />
                </div>
                <Button 
                  type="submit"
                  className="bg-[hsl(163,95%,44%)] hover:bg-[hsl(163,95%,38%)]"
                  disabled={addPhotoMutation.isPending}
                >
                  {addPhotoMutation.isPending ? "Adicionando..." : "Adicionar Foto"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Photos Gallery Management */}
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Galeria</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Carregando fotos...</div>
              ) : photos && photos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.url}
                        alt={photo.description || "Foto da galeria"}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeletePhoto(photo.id)}
                          disabled={deletePhotoMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {photo.description && (
                        <p className="text-xs text-gray-600 mt-1 truncate">
                          {photo.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma foto encontrada na galeria.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
