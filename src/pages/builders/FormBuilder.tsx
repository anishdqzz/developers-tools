import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Copy, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FormBuilder = () => {
  const { toast } = useToast();
  const [formTitle, setFormTitle] = useState("Contact Form");
  const [fields, setFields] = useState([
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "message", label: "Message", type: "textarea", required: false },
  ]);
  const [showPreview, setShowPreview] = useState(true);

  const generateHTML = () => {
    return `<form class="contact-form">
  <h2>${formTitle}</h2>
${fields.map(field => {
  if (field.type === 'textarea') {
    return `  <div class="form-group">
    <label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>
    <textarea id="${field.name}" name="${field.name}"${field.required ? ' required' : ''}></textarea>
  </div>`;
  }
  return `  <div class="form-group">
    <label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>
    <input type="${field.type}" id="${field.name}" name="${field.name}"${field.required ? ' required' : ''} />
  </div>`;
}).join('\n')}
  <button type="submit">Submit</button>
</form>`;
  };

  const generateCSS = () => {
    return `.contact-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.contact-form h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

button[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button[type="submit"]:hover {
  background: #45a049;
}`;
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const addField = () => {
    setFields([...fields, { name: `field${fields.length + 1}`, label: "New Field", type: "text", required: false }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: string, value: string | boolean) => {
    const updated = [...fields];
    updated[index] = { ...updated[index], [key]: value };
    setFields(updated);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Form Builder
          </h1>
          <p className="text-xl text-muted-foreground">
            Create HTML forms with validation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Configuration</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Form Title</Label>
                <Input
                  id="title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Form Fields</Label>
                <div className="space-y-4 mt-2">
                  {fields.map((field, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-2">
                        <Input
                          placeholder="Field Label"
                          value={field.label}
                          onChange={(e) => updateField(index, 'label', e.target.value)}
                        />
                        <Input
                          placeholder="Field Name"
                          value={field.name}
                          onChange={(e) => updateField(index, 'name', e.target.value)}
                        />
                        <select
                          className="w-full p-2 border rounded"
                          value={field.type}
                          onChange={(e) => updateField(index, 'type', e.target.value)}
                        >
                          <option value="text">Text</option>
                          <option value="email">Email</option>
                          <option value="tel">Phone</option>
                          <option value="number">Number</option>
                          <option value="textarea">Textarea</option>
                        </select>
                        <Label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateField(index, 'required', e.target.checked)}
                          />
                          Required
                        </Label>
                        <Button
                          variant="destructive"
                          onClick={() => removeField(index)}
                          className="w-full"
                          disabled={fields.length === 1}
                        >
                          Remove Field
                        </Button>
                      </div>
                    </Card>
                  ))}
                  <Button onClick={addField} className="w-full">
                    Add Field
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                className="w-full"
              >
                <Eye className="mr-2 h-4 w-4" />
                {showPreview ? "Hide" : "Show"} Preview
              </Button>
            </div>
          </Card>

          <div className="space-y-6">
            {showPreview && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div 
                  className="border rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: `<style>${generateCSS()}</style>${generateHTML()}` }}
                />
              </Card>
            )}

            <Card className="p-6">
              <Tabs defaultValue="html">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                </TabsList>
                
                <TabsContent value="html" className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCopy(generateHTML())}
                      variant="outline"
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy HTML
                    </Button>
                    <Button
                      onClick={() => handleDownload(generateHTML(), "form.html")}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{generateHTML()}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="css" className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCopy(generateCSS())}
                      variant="outline"
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy CSS
                    </Button>
                    <Button
                      onClick={() => handleDownload(generateCSS(), "form.css")}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{generateCSS()}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FormBuilder;
